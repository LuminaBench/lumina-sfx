import { parseArgs } from 'node:util';
import { basename, resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { checkIsolatedRecipes, installRecipes, selectRecipes } from './install-files.mjs';
import { loadRecipes } from './recipes.mjs';
import { validateScene } from '../engine/scene.ts';

const { values, positionals } = parseArgs({ allowPositionals: true, options: { isolated: { type: 'boolean' }, dest: { type: 'string' } } });
if (positionals.length !== 1 || !values.dest)
  throw Error('npm run scene:install -- <scene.json> --dest /game/src/audio');
const scene = JSON.parse(await readFile(positionals[0], 'utf8'));
const name = basename(positionals[0], '.json');
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) throw Error('Use a lowercase hyphenated scene filename');
const selected = await selectRecipes(scene.cues.map((cue) => cue.id));
if (values.isolated) await checkIsolatedRecipes(selected);
const recipes = await loadRecipes(new Set(selected.map((s) => s.id)));
validateScene(scene, new Map(recipes.map((r) => [r.id, r])));
const file = 'scenes/' + name + '.ts';
const source = [
  "import { SfxScene, type SoundRecipe } from '../engine/index.ts';",
  ...selected.map((r, i) => 'import cue' + i + " from '../recipes/" + r.id + ".ts';"),
  '',
  'const recipes: SoundRecipe[] = [' + selected.map((r, i) => 'cue' + i).join(', ') + '];',
  'const bank = new Map(recipes.map(r => [r.id, r]));',
  'const scene = ' + JSON.stringify(scene, null, 2) + ' as const;',
  'export default function createScene(context: BaseAudioContext, output: AudioNode = context.destination) {',
  '  return new SfxScene(context, scene, bank, output);',
  '}',
  '',
].join('\n');
const written = await installRecipes(selected, values.dest, { file, source });
console.log(JSON.stringify({ file: resolve(values.dest, file), written, cues: selected.length }));
