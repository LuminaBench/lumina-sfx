#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { resolve } from 'node:path';
import { selectRecipes, installRecipes } from './install-files.mjs';
const { values, positionals } = parseArgs({
  options: { dest: { type: 'string', default: './src/lumina-sfx' }, help: { type: 'boolean' } },
  allowPositionals: true,
});
if (values.help || !positionals.length) {
  console.log('Usage: node scripts/install-sfx.mjs <sound-id> [sound-id…] [--dest <directory>]');
  if (!values.help) process.exitCode = 1;
} else {
  try {
    const selected = await selectRecipes(positionals);
    const dest = resolve(values.dest);
    const written = await installRecipes(selected, dest);
    console.log(`Installed ${selected.length} recipe(s) into ${dest} (${written} files written)`);
    for (const r of selected) console.log('  ' + r.file);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
