#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import { loadRecipes } from './recipes.mjs';
import { macroControls, renderDurationSec } from '../engine/sculpt.ts';

const recipes = await loadRecipes();
if (!recipes.length) throw new Error('No recipes found');
const { tickets } = JSON.parse(await readFile(new URL('../tasks/queue.json', import.meta.url), 'utf8'));
const collections = new Map(tickets.map(({ id, collection }) => [id, collection]));
const sounds = recipes.map(recipe => {
  const { id, name, category, tags, loopable, macros, params, targetRmsDbfs, mixRole, recording, additionalRecordings, spectrum, renderStereo } = recipe;
  return {
    id, name, category, collection: collections.get(id), tags, loopable, durationSec: renderDurationSec(recipe), macros, params, targetRmsDbfs, mixRole, recording,
    additionalRecordings, spectrum, channels: renderStereo ? 2 : 1, file: `recipes/${id}.ts`,
  };
});
await writeFile(new URL('../catalog.json', import.meta.url),
  JSON.stringify({ schemaVersion: 1, macroControls, count: sounds.length, sounds }, null, 2) + '\n');
process.stdout.write(`Indexed ${sounds.length} recipes\n`);
