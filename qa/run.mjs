import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { DEFAULT_SEED, renderSound, SAMPLE_RATE } from '../engine/render.ts';
import { encodeWav } from '../engine/wav.ts';
import { balanceLevels, balanceSettings, measureLevel, resolveMixRole } from '../engine/levels.ts';
import { decodeWav, inspect, inspectBalanced } from './metrics.mjs';
import { loadRecipes, ROOT } from '../scripts/recipes.mjs';

const output = join(ROOT, 'qa', 'output');
const seedCount = 4;

async function check(recipe, extremes, bothLevels) {
  const variants = [];
  const wavPath = join(output, `${recipe.id}.wav`);
  for (const setting of extremes ? ['default', 'min', 'max'] : ['default']) {
    const params = Object.fromEntries(Object.entries(recipe.params).map(([key, spec]) => [key, spec[setting]]));
    for (let variant = 0; variant < seedCount; variant++) {
      const seed = DEFAULT_SEED + variant * 8191;
      const entry = extremes ? { seed, setting } : { seed };
      try {
        const original = renderSound(recipe, { seed, params });
        const wav = encodeWav(original);
        const pcm = decodeWav(wav, SAMPLE_RATE);
        if (pcm.length !== Math.round(recipe.durationSec * SAMPLE_RATE)) throw new Error('WAV duration mismatch');
        if (setting === 'default' && variant === 0) await writeFile(wavPath, new Uint8Array(wav));
        const checks = inspect(pcm, recipe, SAMPLE_RATE);
        if (bothLevels) {
          const role = resolveMixRole(recipe);
          const settings = balanceSettings(original, SAMPLE_RATE, role);
          const balanced = decodeWav(encodeWav(balanceLevels(original, SAMPLE_RATE, role)), SAMPLE_RATE);
          checks.balanced = inspectBalanced(balanced, recipe, SAMPLE_RATE, settings, measureLevel(balanced, SAMPLE_RATE));
          if (setting === 'default' && variant === 0) {
            const repeat = encodeWav(renderSound(recipe, { seed, params }));
            checks.deterministic = { pass: Buffer.from(wav).equals(Buffer.from(repeat)) };
          }
        }
        variants.push({ ...entry, pass: Object.values(checks).every((check) => check === null || check.pass), checks });
      } catch (error) {
        variants.push({ ...entry, pass: false, error: error.message });
      }
    }
  }
  return { id: recipe.id, loopable: recipe.loopable, pass: variants.every((item) => item.pass), wav: variants[0].checks ? wavPath : null, variants };
}

try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { collection: { type: 'string' }, extremes: { type: 'boolean' }, 'both-levels': { type: 'boolean' } },
  });
  if (positionals.length > 1 || (positionals.length && values.collection)) {
    throw new Error('Usage: npm run qa -- [<sound-id|all> | --collection <name>] [--extremes] [--both-levels]');
  }
  const arg = positionals[0] ?? 'all';
  let ids = arg === 'all' ? undefined : new Set([arg]);
  let name = arg === 'all' ? 'report' : `report-${arg}`;
  if (values.collection) {
    const { tickets } = JSON.parse(await readFile(join(ROOT, 'tasks', 'queue.json'), 'utf8'));
    ids = new Set(tickets.filter((ticket) => ['review', 'released'].includes(ticket.status) && ticket.collection === values.collection).map((ticket) => ticket.id));
    if (!ids.size) throw new Error(`Unknown sound collection: ${values.collection}`);
    const slug = values.collection.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    name = `report-collection-${slug}`;
  }
  const selected = await loadRecipes(ids);
  if (values.collection && selected.length !== ids.size) throw new Error(`A recipe is missing from ${values.collection}`);
  if (!selected.length) throw new Error(`Unknown sound id: ${arg}`);
  await mkdir(output, { recursive: true });
  const results = [];
  for (const recipe of selected) results.push(await check(recipe, values.extremes, values['both-levels']));
  const passed = results.filter((item) => item.pass).length;
  const report = {
    pass: passed === results.length, sampleRate: SAMPLE_RATE, bitDepth: 16, channels: 1,
    passed, failed: results.length - passed, variantsPerSound: seedCount * (values.extremes ? 3 : 1),
    ...(values['both-levels'] ? { profiles: ['original', 'balanced'] } : {}), results,
  };
  const json = JSON.stringify(report, null, 2) + '\n';
  await writeFile(join(output, `${name}${values.extremes ? '-extremes' : ''}${values['both-levels'] ? '-both-levels' : ''}.json`), json);
  process.stdout.write(json);
  if (!report.pass) process.exitCode = 1;
} catch (error) {
  process.stdout.write(JSON.stringify({ pass: false, error: error.message }) + '\n');
  process.exitCode = 1;
}
