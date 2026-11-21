import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DEFAULT_SEED, renderSound, SAMPLE_RATE } from '../engine/render.ts';
import { encodeWav } from '../engine/wav.ts';
import { decodeWav, inspect } from './metrics.mjs';
import { loadRecipes, ROOT } from '../scripts/recipes.mjs';

const arg = process.argv[2] ?? 'all';
const output = join(ROOT, 'qa', 'output');
const seedCount = 4;

async function check(recipe) {
  const variants = [];
  const wavPath = join(output, `${recipe.id}.wav`);
  for (let variant = 0; variant < seedCount; variant++) {
    const seed = DEFAULT_SEED + variant * 8191;
    try {
      const wav = encodeWav(renderSound(recipe, { seed }));
      const pcm = decodeWav(wav, SAMPLE_RATE);
      if (pcm.length !== Math.round(recipe.durationSec * SAMPLE_RATE)) throw new Error('WAV duration mismatch');
      if (variant === 0) await writeFile(wavPath, new Uint8Array(wav));
      const checks = inspect(pcm, recipe, SAMPLE_RATE);
      variants.push({ seed, pass: Object.values(checks).every((check) => check === null || check.pass), checks });
    } catch (error) {
      variants.push({ seed, pass: false, error: error.message });
    }
  }
  return { id: recipe.id, loopable: recipe.loopable, pass: variants.every((item) => item.pass), wav: variants[0].checks ? wavPath : null, variants };
}

try {
  const all = await loadRecipes();
  const selected = all.filter((recipe) => arg === 'all' || recipe.id === arg);
  if (!selected.length) throw new Error(`Unknown sound id: ${arg}`);
  await mkdir(output, { recursive: true });
  const results = [];
  for (const recipe of selected) results.push(await check(recipe));
  const passed = results.filter((item) => item.pass).length;
  const report = {
    pass: passed === results.length, sampleRate: SAMPLE_RATE, bitDepth: 16, channels: 1,
    passed, failed: results.length - passed, variantsPerSound: seedCount, results,
  };
  const json = JSON.stringify(report, null, 2) + '\n';
  await writeFile(join(output, arg === 'all' ? 'report.json' : `report-${arg}.json`), json);
  process.stdout.write(json);
  if (!report.pass) process.exitCode = 1;
} catch (error) {
  process.stdout.write(JSON.stringify({ pass: false, error: error.message }) + '\n');
  process.exitCode = 1;
}
