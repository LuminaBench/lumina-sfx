import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { DEFAULT_SEED, SAMPLE_RATE, renderSound } from '../engine/render.ts';
import { balanceLevels, balanceSettings, measureLevel, resolveMixRole } from '../engine/levels.ts';
import { checkLoop } from './metrics.mjs';
import { loadRecipes } from '../scripts/recipes.mjs';

const round = (value) => Number(value.toFixed(2));
const bands = new Map();
const results = [];
const manifest = process.argv[2];
const ids = manifest ? new Set(JSON.parse(await readFile(manifest, 'utf8'))) : undefined;
const recipes = await loadRecipes(ids);
if (!recipes.length || (ids && recipes.length !== ids.size)) throw new Error('The audit needs valid recipe IDs');

for (const recipe of recipes) {
  const raw = renderSound(recipe, { seed: DEFAULT_SEED });
  const role = resolveMixRole(recipe);
  const { activeDb, peakDbfs, targetDb, ceilingDbfs, gainDb } = balanceSettings(raw, SAMPLE_RATE, role);
  const balanced = balanceLevels(raw, SAMPLE_RATE, role);
  const measured = measureLevel(balanced, SAMPLE_RATE);
  const loop = recipe.loopable ? checkLoop(balanced, SAMPLE_RATE) : null;
  const group = bands.get(role) ?? { before: [], after: [] };
  group.before.push(activeDb - targetDb);
  group.after.push(measured.activeDb - targetDb);
  bands.set(role, group);
  results.push({
    id: recipe.id, role, targetDb, ceilingDbfs, gainDb: round(gainDb),
    originalDb: round(activeDb), originalPeakDbfs: round(peakDbfs),
    balancedDb: round(measured.activeDb), balancedPeakDbfs: round(measured.peakDbfs),
    targetDifferenceDb: round(measured.activeDb - targetDb),
    pass: measured.peakDbfs <= ceilingDbfs + 0.001 && (!loop || loop.pass), loop,
  });
}

function spread(values) {
  const sorted = values.map(Math.abs).sort((a, b) => a - b);
  return { median: round(sorted[Math.floor(sorted.length / 2)]), p90: round(sorted[Math.floor(sorted.length * 0.90)]) };
}

const byRole = Object.fromEntries([...bands].map(([role, { before, after }]) =>
  [role, { count: before.length, originalErrorDb: spread(before), balancedErrorDb: spread(after) }]));
const all = [...bands.values()];
const failed = results.filter(result => !result.pass).length;
const summary = {
  sounds: results.length, failed,
  originalErrorDb: spread(all.flatMap(group => group.before)),
  balancedErrorDb: spread(all.flatMap(group => group.after)),
  byRole,
};
if (!manifest) {
  await mkdir(new URL('./output/', import.meta.url), { recursive: true });
  await writeFile(new URL('./output/level-audit.json', import.meta.url), JSON.stringify({ ...summary, results }, null, 2) + '\n');
}
console.log(JSON.stringify(summary, null, 2));
if (failed) process.exitCode = 1;
