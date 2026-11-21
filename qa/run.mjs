import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { mkdir, readFile, writeFile, rename, rm } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';
import { studioVault } from '../scripts/vault.mjs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { DEFAULT_SEED, renderSound, renderChannels, SAMPLE_RATE } from '../engine/render.ts';
import { encodeWav } from '../engine/wav.ts';
import { balanceLevels, balanceSettings, measureLevel, resolveMixRole } from '../engine/levels.ts';
import { decodeWav, inspect, inspectBalanced } from './metrics.mjs';
import { loadRecipes, ROOT } from '../scripts/recipes.mjs';

const output = join(ROOT, 'qa', 'output');
const seedCount = 4;
const masters = join(studioVault(), 'master-wav');
const repairs = join(output, 'rework');
async function publish(path, bytes) {
  const temp = path + '.' + randomUUID() + '.tmp';
  try {
    await writeFile(temp, bytes);
    await rename(temp, path);
  } finally { await rm(temp, { force: true }); }
}


async function check(recipe, extremes, bothLevels) {
  const variants = [];
  let candidate;
  const wavPath = join(masters, `${recipe.id}.wav`);
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
        const checks = inspect(pcm, recipe, SAMPLE_RATE);
        let master = wav;
        if (recipe.renderStereo) {
          const channels = renderChannels(recipe, { seed, params });
          master = encodeWav(channels);
          let energy = 0, sumEnergy = 0, sideEnergy = 0, peak = 0;
          for (let i = 0; i < channels[0].length; i++) {
            const a = channels[0][i], b = channels[1][i];
            energy += (a*a + b*b)/2;
            sumEnergy += ((a+b)/2)**2;
            sideEnergy += ((a-b)/2)**2;
            peak = Math.max(peak, Math.abs(a), Math.abs(b));
          }
          const foldRatio = sumEnergy/energy, sideRatio = sideEnergy/energy;
          checks.stereo = { pass: peak <= 10**(-0.5/20) && foldRatio > 0.25 && sideRatio > 1e-6 &&
            master.byteLength === 44 + pcm.length*4 && new DataView(master).getUint16(22, true) === 2,
            foldRatio, sideRatio, peak };
          if (bothLevels) {
            const role = resolveMixRole(recipe);
            const settings = channels.map(c => balanceSettings(c, SAMPLE_RATE, role));
            const linkedGain = Math.min(...settings.map(s => s.gainDb));
            const balanced = renderChannels(recipe, { seed, params, level: 'balanced' });
            const sides = balanced.map((c, i) => {
              const measured = measureLevel(c, SAMPLE_RATE);
              return { peak: measured.peakDbfs, gain: measured.activeDb-settings[i].activeDb };
            });
            checks.stereoBalanced = { pass: sides.every(s => s.peak <= settings[0].ceilingDbfs+.01 &&
              Math.abs(s.gain-linkedGain)<.1), linkedGain, sides };
            if (setting === 'default' && variant === 0) {
              const repeat = encodeWav(renderChannels(recipe, { seed, params }));
              checks.stereoDeterministic = { pass: Buffer.from(master).equals(Buffer.from(repeat)) };
            }
          }
        }
        if (setting === 'default' && variant === 0) candidate = Buffer.from(master);
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
  const pass = variants.every(v => v.pass);
  if (pass) await publish(wavPath, candidate);
  return { id: recipe.id, channels: recipe.renderStereo ? 2 : 1, loopable: recipe.loopable, pass,
    wav: pass ? wavPath : null, masterSha256: pass ? createHash('sha256').update(candidate).digest('hex') : null, variants };

}

async function checkAndRoute(recipe, extremes, bothLevels) {
  const result = await check(recipe, extremes, bothLevels);
  const ticket = join(repairs, recipe.id + (extremes ? '-extremes' : '') + '.json');
  const fails = result.variants.filter(v => v.checks?.stationaryBuzz?.pass === false);
  if (fails.length) {
    await publish(ticket, JSON.stringify({ id: recipe.id, status: 'rework', reason: 'stationary-buzz',
      action: 'Inspect the indicated time and frequency. Replace persistent oscillation with credited recorded texture or a changing natural decay, then rerun these seeds.',
      variants: fails.map(v => ({ seed: v.seed, setting: v.setting || 'default', ...v.checks.stationaryBuzz })) }, null, 2));
  } else if (result.pass) await rm(ticket, { force: true });
  return result;
}
if (!isMainThread) {
  const results = [];
  for (const r of await loadRecipes(new Set(workerData.ids))) {
    results.push(await checkAndRoute(r, workerData.extremes, workerData.bothLevels));
  }
  parentPort.postMessage(results);
} else try {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: { jobs: {type:'string'}, collection: { type: 'string' }, extremes: { type: 'boolean' }, 'both-levels': { type: 'boolean' } },
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
  await Promise.all([masters, repairs].map(dir => mkdir(dir, { recursive: true })));
  const results = [];
  const jobs = Number(values.jobs || 1);
  if (!Number.isInteger(jobs) || jobs < 1 || jobs > 12) throw new Error('--jobs expects 1 to 12');
  if (jobs === 1) {
    for (const recipe of selected) results.push(await checkAndRoute(recipe, values.extremes, values['both-levels']));
  } else {
    const chunks = Array.from({length:Math.min(jobs, selected.length)}, () => []);
    selected.forEach((r,i) => chunks[i % chunks.length].push(r.id));
    const parts = await Promise.all(chunks.map(ids => new Promise((resolve,reject) => {
      const worker = new Worker(new URL(import.meta.url), { workerData: { ids, extremes:values.extremes, bothLevels:values['both-levels'] } });
      worker.once('message', resolve);
      worker.once('error', reject);
      worker.once('exit', code => { if (code) reject(new Error('QA worker exited with status '+code)); });
    })));
    results.push(...parts.flat().sort((a,b) => a.id.localeCompare(b.id)));
  }
  const passed = results.filter((item) => item.pass).length;
  const channelCounts = [...new Set(results.map(r => r.channels))].sort();
  const report = {
    pass: passed === results.length, sampleRate: SAMPLE_RATE, bitDepth: 16, channelCounts,
    ...(channelCounts.length === 1 ? { channels: channelCounts[0] } : {}),
    passed, failed: results.length - passed, variantsPerSound: seedCount * (values.extremes ? 3 : 1),
    ...(values['both-levels'] ? { profiles: ['original', 'balanced'] } : {}), results,
  };
  const json = JSON.stringify(report, null, 2) + '\n';
  await publish(join(output, `${name}${values.extremes ? '-extremes' : ''}${values['both-levels'] ? '-both-levels' : ''}.json`), json);
  process.stdout.write(json);
  if (!report.pass) process.exitCode = 1;
} catch (error) {
  process.stdout.write(JSON.stringify({ pass: false, error: error.message }) + '\n');
  process.exitCode = 1;
}
