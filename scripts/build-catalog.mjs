#!/usr/bin/env node
import { writeFile } from 'node:fs/promises';
import { loadRecipes } from './recipes.mjs';

const recipes = await loadRecipes();
if (!recipes.length) throw new Error('No recipes found');
const sounds = recipes.map(({ id, name, category, tags, loopable, durationSec, params, spectrum }) => ({
  id, name, category, tags, loopable, durationSec, params, spectrum, file: `recipes/${id}.ts`,
}));
await writeFile(new URL('../catalog.json', import.meta.url),
  JSON.stringify({ schemaVersion: 1, count: sounds.length, sounds }, null, 2) + '\n');
process.stdout.write(`Indexed ${sounds.length} recipes\n`);
