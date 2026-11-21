import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import { renderSound } from '../engine/render.ts';
import { encodeWav } from '../engine/wav.ts';
import { ROOT } from './recipes.mjs';
import { studioVault } from './vault.mjs';

const { values } = parseArgs({ options: {
  dest: { type: 'string' }, asset: { type: 'string', multiple: true }, 'catalog-3d': { type: 'string' }, help: { type: 'boolean' },
} });
if (values.help) {
  console.log('node --experimental-strip-types scripts/build-3d-bank.mjs [--dest <game/public/audio>] [--asset <3d-asset-id> ...] [--catalog-3d <3d/catalog.json>]');
  process.exit(0);
}
const map = JSON.parse(await readFile(join(ROOT, 'references/3d-audio-map.json'), 'utf8'));
if (values['catalog-3d']) {
  const { items } = JSON.parse(await readFile(values['catalog-3d'], 'utf8'));
  for (const asset of items.filter(item => item.type === 'asset' && item.mode)) {
    const profile = map.profiles[map.assets[asset.id]];
    if (profile?.mode !== asset.mode) throw Error('Missing matching sound profile for 3D asset ' + asset.id);
  }
}
const selected = values.asset || Object.keys(map.assets);
for (const id of selected) if (!Object.hasOwn(map.assets, id)) throw Error('Unknown 3D asset ' + id);
const assets = Object.fromEntries(selected.map(id => [id, map.assets[id]]));
const used = new Set([...Object.values(map.defaults), ...Object.values(assets)]);
const profiles = Object.fromEntries([...used].map(key => [key, map.profiles[key]]));
const renderIds = new Map(Object.entries(map.cues));
for (const { idle, power } of Object.values(profiles)) for (const id of [idle, power]) renderIds.set(id, id);
for (const id of Object.values(map.weather)) renderIds.set(id, id);
const destination = resolve(values.dest || join(studioVault(), 'master-wav', 'lumina-3d-bank'));
await mkdir(destination, { recursive: true });
const stage = await mkdtemp(join(destination, '.preparing-'));
const manifest = { version: 2, defaults: map.defaults, assets, profiles, weather: map.weather, cues: {} };
try {
  for (const [role, id] of renderIds) {
    const recipe = (await import(pathToFileURL(join(ROOT, 'recipes', id + '.ts')))).default;
    const loop = ['car','boat','jet','rain'].includes(role) || role === id;
    if (recipe.id !== id || recipe.loopable !== loop) throw Error('Unexpected recipe ID or loop flag for ' + id);
    const rate = 32000;
    const samples = renderSound(recipe, { seed: 2611, level: 'balanced' }, rate);
    const wav = Buffer.from(encodeWav(samples, rate));
    const hash = createHash('sha256').update(wav).digest('hex').slice(0, 12);
    const name = id + '-' + hash + '.wav';
    await writeFile(join(stage, name), wav);
    await rename(join(stage, name), join(destination, name));
    manifest.cues[role] = { id, loop, url: name,
      credits: [recipe.recording, ...(recipe.additionalRecordings || [])].filter(Boolean) };
  }
  await writeFile(join(stage, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  await rename(join(stage, 'manifest.json'), join(destination, 'manifest.json'));
  console.log(JSON.stringify({ manifest: join(destination, 'manifest.json'), cues: renderIds.size, assets: selected.length }));
} finally {
  await rm(stage, { recursive: true, force: true });
}
