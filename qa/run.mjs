import { checkRecipe, publish } from './check-recipe.mjs';
import { SAMPLE_RATE } from '../engine/render.ts';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { loadRecipes, ROOT } from '../scripts/recipes.mjs';

const output = join(ROOT, 'qa', 'output');
const seedCount = 4;
const masters = join(ROOT, 'qa/output', 'master-wav');
const repairs = join(output, 'rework');
async function checkAndRoute(recipe, extremes, bothLevels) {
  const result = await checkRecipe(recipe, { extremes, bothLevels, wavPath: join(masters, recipe.id + '.wav') });
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
    options: { file: { type:'string' }, jobs: {type:'string'}, collection: { type: 'string' }, extremes: { type: 'boolean' }, 'both-levels': { type: 'boolean' } },
  });
  if (positionals.length > 1 || (positionals.length && (values.collection || values.file)) || (values.file && values.collection)) {
    throw new Error('Usage: npm run qa -- [<sound-id|all> | --collection <name> | --file <recipe.ts>] [--extremes] [--both-levels]');
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
  const selected = values.file
    ? [(await import(pathToFileURL(resolve(values.file)).href)).default]
    : await loadRecipes(ids);
  if (values.file) {
    if (typeof selected[0]?.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(selected[0].id) || typeof selected[0]?.render !== 'function') {
      throw Error('Expected a default-exported SoundRecipe with a valid ID');
    }
    name = 'report-custom-' + selected[0].id;
  }
  if (values.collection && selected.length !== ids.size) throw new Error(`A recipe is missing from ${values.collection}`);
  if (!selected.length) throw new Error(`Unknown sound id: ${arg}`);
  await Promise.all([masters, repairs].map(dir => mkdir(dir, { recursive: true })));
  const results = [];
  const jobs = Number(values.jobs || 1);
  if (!Number.isInteger(jobs) || jobs < 1 || jobs > 12) throw new Error('--jobs expects 1 to 12');
  if (values.file) {
    const directory = join(output, 'custom');
    await mkdir(directory, { recursive: true });
    const recipe = selected[0];
    results.push(await checkRecipe(recipe, { extremes: values.extremes, bothLevels: values['both-levels'],
      wavPath: join(directory, recipe.id + '.wav') }));
  } else if (jobs === 1) {
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
