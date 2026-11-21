#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { parseArgs } from 'node:util';
import { ROOT } from './recipes.mjs';

const { values, positionals } = parseArgs({
  options: { dest: { type: 'string', default: './src/lumina-sfx' }, help: { type: 'boolean' } },
  allowPositionals: true,
});
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

async function existing(target) {
  try {
    return await readFile(target, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function install() {
  const catalog = JSON.parse(await readFile(resolve(ROOT, 'catalog.json'), 'utf8'));
  const selected = [...new Set(positionals)].map((id) => {
    const item = catalog.sounds.find((sound) => sound.id === id);
    if (!item || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.id) || item.file !== `recipes/${item.id}.ts`) {
      throw new Error(`Unknown sound id: ${id}`);
    }
    return item;
  });
  const files = new Map();
  await collect(runtime, files);
  for (const recipe of selected) await collect(recipe.file, files);
  const dest = resolve(values.dest);
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
    try {
      await writeFile(target, source, { flag: 'wx' });
    } catch (error) {
      if (error.code !== 'EEXIST' || await existing(target) !== source) throw error;
    }
  }
  console.log(`Installed ${selected.length} recipe(s) into ${dest} (${pending.length} files written)`);
  for (const recipe of selected) console.log(`  ${recipe.file}`);
}

if (values.help || !positionals.length) {
  console.log('Usage: node scripts/install-sfx.mjs <sound-id> [sound-id…] [--dest <directory>]');
  if (!values.help) process.exitCode = 1;
} else {
  try {
    await install();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
