import { constants } from 'node:fs';
import { mkdir, readFile, writeFile, copyFile, link, rm } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { randomUUID } from 'node:crypto';
import { ROOT } from './recipes.mjs';

const runtime = 'engine/index.ts';

async function collect(file, files) {
  if (files.has(file)) return;
  const source = await readFile(resolve(ROOT, file), 'utf8');
  files.set(file, source);
  const imports = source.matchAll(/(?:\bfrom\s*|\bimport\s*)['"]([.][.\/]([^'"]+)\.ts)['"]/g);
  for (const [ , specifier] of imports) {
    const imported = relative(ROOT, resolve(ROOT, dirname(file), specifier));
    if (isAbsolute(imported) || !['engine', 'recipes'].includes(imported.split(sep)[0])) {
      throw new Error(`Unsupported dependency in ${file}: ${specifier}`);
    }
    await collect(imported, files);
  }
}

export async function checkIsolatedRecipes(selected, {clean = false} = {}) {
  const inputs = JSON.parse(await readFile(resolve(ROOT, 'sources/isolated-inputs.json'), 'utf8'));
  const allowed = new Set([...inputs.stationaryTexture, ...inputs.transient, ...Object.keys(inputs.windows)].map(name => 'recipes/_recordings/isolated-' + name + '.ts'));
  const files = new Map();
  for (const item of selected) {
    if (clean && (item.cleanHold || item.auditionNote)) throw Error('Source awaits background review: ' + item.id);
    if (item.isolation !== 'isolated') throw Error('Unreviewed for isolated playback: ' + item.id);
    await collect(item.file, files);
  }
  for (const file of files.keys()) {
    if (file.startsWith('recipes/_recordings/') && !allowed.has(file)) throw Error('Unreviewed recording in isolated selection: ' + file);
  }
}

async function existing(target) {
  try {
    return await readFile(target, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

export async function selectRecipes(ids) {
  const catalog = JSON.parse(await readFile(resolve(ROOT, 'catalog.json'), 'utf8'));
  const selected = [...new Set(ids)].map((id) => {
    const item = catalog.sounds.find((sound) => sound.id === id);
    if (!item || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || item.file !== `recipes/${item.id}.ts`) {
      throw new Error(`Unknown sound id: ${id}`);
    }
    return item;
  });
  return selected;
}

export async function installRecipes(selected, dest, custom) {
  const files = new Map();
  await collect(runtime, files);
  for (const recipe of selected) await collect(recipe.file, files);
  // The generated recipe is published last, after all its dependencies exist.
  for(const dep of custom?.dependencies??[]) await collect(dep,files);
  if(files.has('engine/hrtf/sadie-h3.ts')) for(const name of ['NOTICE.md','LICENSE.txt']) {
    const path='engine/hrtf/'+name;
    files.set(path,await readFile(resolve(ROOT,path),'utf8'));
  }
  if (custom) files.set(custom.file, custom.source);
  dest = resolve(dest);
  const pending = [];
  for (const [file, source] of files) {
    const target = resolve(dest, file);
    const previous = await existing(target);
    if (previous === source) continue;
    if (previous !== null) throw new Error(`File has local changes: ${target}`);
    pending.push([target, source]);
  }
  for (const [target, source] of pending) {
    await mkdir(dirname(target), { recursive: true });
    const temporary = target + '.' + randomUUID() + '.tmp';
    try {
      await writeFile(temporary, source, { flag: 'wx' });
      // Publish complete bytes without overwriting a concurrent install or local edit.
      try {
        await link(temporary, target);
      } catch (error) {
        if (!['ENOTSUP', 'EOPNOTSUPP', 'EPERM', 'ENOSYS', 'EXDEV'].includes(error.code)) throw error;
        await copyFile(temporary, target, constants.COPYFILE_EXCL);
      }
    } catch (error) {
      if (error.code !== 'EEXIST' || await existing(target) !== source) throw error;
    } finally {
      await rm(temporary, { force: true });
    }
  }
  return pending.length;
}
