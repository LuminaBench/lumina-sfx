#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { loadRecipes } from './recipes.mjs';

const recipes = await loadRecipes();
if (!recipes.length) throw new Error('No recipes found');
const { tickets } = JSON.parse(await readFile(new URL('../tasks/queue.json', import.meta.url), 'utf8'));
const collections = new Map(tickets.map(({ id, collection }) => [id, collection]));
const sounds = recipes.map(({ id, name, category, tags, loopable, durationSec, params, targetRmsDbfs, mixRole, recording, additionalRecordings, spectrum }) => ({
  id, name, category, collection: collections.get(id), tags, loopable, durationSec, params, targetRmsDbfs, mixRole, recording,
  additionalRecordings, spectrum, file: `recipes/${id}.ts`,
}));
await writeFile(new URL('../catalog.json', import.meta.url),
  JSON.stringify({ schemaVersion: 1, count: sounds.length, sounds }, null, 2) + '\n');
process.stdout.write(`Indexed ${sounds.length} recipes\n`);
