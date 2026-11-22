import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join, resolve } from 'node:path';
import { ROOT, loadRecipes } from './recipes.mjs';
import { installRecipes } from './install-files.mjs';
import { digest, publishAsset } from './audio-export.mjs';
import { checkRecipe } from '../qa/check-recipe.mjs';
import { DEFAULT_SEED, renderChannels } from '../engine/render.ts';
import { encodeWav } from '../engine/wav.ts';

const adapters = { web: 'web-threejs', godot: 'godot4', unity: 'unity', unreal: 'unreal', python: 'python' };
const folders = { web: 'public/lumina-sfx', godot: 'lumina_sfx', unity: 'Assets/Resources/LuminaSfx',
  unreal: 'Content/LuminaSfx', python: 'lumina_sfx', wav: 'audio/lumina-sfx' };

export async function detectProject(start) {
  let dir = resolve(start);
  while (true) {
    if (existsSync(dir)) {
      const names = await readdir(dir);
      if (names.includes('project.godot')) return { engine: 'godot', root: dir };
      if (names.includes('Assets') && names.includes('ProjectSettings')) return { engine: 'unity', root: dir };
      if (names.some(n => n.endsWith('.uproject'))) return { engine: 'unreal', root: dir };
      if (names.includes('pyproject.toml') || names.includes('requirements.txt')) return { engine: 'python', root: dir };
      if (names.includes('package.json') && dir !== resolve(ROOT)) return { engine: 'web', root: dir };
    }
    if (dirname(dir) === dir) return null;
    dir = dirname(dir);
  }
}

async function copyHelper(source, destination) {
  for (const item of await readdir(source, { withFileTypes: true })) {
    const from = join(source, item.name), to = join(destination, item.name);
    if (item.isDirectory()) await copyHelper(from, to);
    if (item.isFile()) await publishAsset(to, await readFile(from));
  }
}

export async function installEngine(selected, { engine, root, dest }) {
  if (!Object.hasOwn(folders, engine)) throw Error('Unknown target engine: ' + engine);
  const directory = resolve(dest ?? join(root, folders[engine]));
  const sounds = await loadRecipes(new Set(selected.map(s => s.id)));
  const entries = {};
  for (const cue of sounds) {
    const qa = await checkRecipe(cue, { bothLevels: true });
    if (!qa.pass) throw Error('QA failed for ' + cue.id);
    const files = [];
    for (let i = 0; i < 3; i++) {
      const seed = DEFAULT_SEED + i * 8191;
      if (i === 0 && digest(Buffer.from(encodeWav(renderChannels(cue, { seed })))) !== qa.masterSha256)
        throw Error('Master checksum mismatch for ' + cue.id);
      const bytes = Buffer.from(encodeWav(renderChannels(cue, { seed, level: 'balanced' })));
      const path = 'audio/' + cue.id + '-0' + (i + 1) + '.wav';
      await publishAsset(join(directory, path), bytes);
      files.push({ path, sha256: digest(bytes), seed });
    }
    entries[cue.id] = { loopable: cue.loopable, level: 'balanced', masterSha256: qa.masterSha256, files,
      credits: [cue.recording, ...(cue.additionalRecordings ?? [])].filter(Boolean) };
  }
  const adapter = adapters[engine];
  const helpers = engine === 'unreal' ? (dest ? join(directory, 'Plugins/LuminaSfx') : join(root, 'Plugins/LuminaSfx')) : directory;
  if (adapter) await copyHelper(join(ROOT,'adapters',adapter), helpers);
  if (engine === 'web') await installRecipes(selected, dest ? join(directory, 'typescript') : join(root, 'src/lumina-sfx'));
  // Serialize manifest publication. Independent immutable assets are safe to retry.
  const manifest = join(directory, 'manifest.json');
  const lock = join(directory, '.lumina-manifest-lock');
  await mkdir(lock);
  try {
    let previous = { schemaVersion: 1, engine, sounds: {} };
    if (existsSync(manifest)) previous = JSON.parse(await readFile(manifest, 'utf8'));
    if (previous.schemaVersion !== 1 || previous.engine !== engine || !previous.sounds)
      throw Error('Incompatible existing manifest: ' + manifest);
    for (const [id, entry] of Object.entries(entries)) {
      if (previous.sounds[id] && JSON.stringify(previous.sounds[id]) !== JSON.stringify(entry))
        throw Error('Existing manifest entry differs: ' + id);
      previous.sounds[id] = entry;
    }
    const temp = join(lock, basename(manifest));
    await writeFile(temp, JSON.stringify(previous, null, 2) + '\n');
    await rename(temp, manifest);
  } finally {
    await rm(lock, { recursive: true, force: true });
  }
  return { engine, ids: Object.keys(entries), manifest, adapter: adapter ? helpers : null };
}
