import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { checkIsolatedRecipes, selectRecipes } from './install-files.mjs';
import { loadDesign } from './remix-design.mjs';
import { loadRecipes } from './recipes.mjs';
import { renderChannels, SAMPLE_RATE, DEFAULT_SEED } from '../engine/render.ts';
import { measureLevel } from '../engine/levels.ts';
import { encodeWav } from '../engine/wav.ts';
import { sceneStyles } from '../engine/remix.ts';

const { positionals: inputs, values } = parseArgs({
  allowPositionals: true,
  options: {
    isolated: { type: 'boolean' },
    styles: { type: 'boolean' },
    bed: { type: 'string' },
    out: { type: 'string' },
    help: { type: 'boolean' },
  },
});
if (values.help) {
  console.log(
    'npm run audition -- <id-or-design.json> <id-or-design.json> [third] (or one candidate with --styles) [--isolated] --bed <loop-id> --out <desk.html>',
  );
  process.exit(0);
}
if ((values.styles ? inputs.length !== 1 : ![2, 3].includes(inputs.length)) || !values.out)
  throw Error('Choose two or three candidates and an --out HTML file');
async function recipe(id) {
  const [sound] = await loadRecipes(new Set([id]));
  if (!sound) throw Error('Unknown sound: ' + id);
  return sound;
}
async function candidate(input, style) {
  async function group(design, directory) {
    const {recipe, selected} = await loadDesign(design, directory);
    if (values.isolated) await checkIsolatedRecipes(selected);
    return recipe;
  }
  if (!input.endsWith('.json')) {
    const base = await recipe(input);
    if (values.isolated) await checkIsolatedRecipes(await selectRecipes([input]));
    if (!style) return base;
    return { ...base, id: base.id + '-' + style, macros: { ...sceneStyles[style], ...base.macros } };
  }
  if (!style) return group(input);
  const spec = JSON.parse(await readFile(input, 'utf8'));
  return group({ ...spec, id: spec.id + '-' + style, style }, dirname(resolve(input)));
}
function preview(sound, seed) {
  const channels = renderChannels(sound, { seed, level: 'balanced' });
  return channels.map((pcm) => {
    if (pcm.length <= 12 * SAMPLE_RATE) return pcm;
    const excerpt = pcm.slice(0, 12 * SAMPLE_RATE);
    const fade = Math.round(0.025 * SAMPLE_RATE);
    for (let i = 0; i < fade; i++) excerpt[excerpt.length - 1 - i] *= i / fade;
    return excerpt;
  });
}
const wav = (channels) => Buffer.from(encodeWav(channels)).toString('base64');
const sounds = await Promise.all(
  values.styles
    ? Object.keys(sceneStyles).map((style) => candidate(inputs[0], style))
    : inputs.map((input) => candidate(input)),
);
if (new Set(sounds.map((r) => r.id)).size !== sounds.length) throw Error('Each candidate needs a distinct ID');
const takes = sounds.map((sound) =>
  Array.from({ length: 10 }, (_, i) => {
    const channels = preview(sound, DEFAULT_SEED + i * 8191);
    const level = Math.max(...channels.map((c) => measureLevel(c, SAMPLE_RATE).activeDb));
    if (!Number.isFinite(level) || channels.every((c) => c.every((s) => s === 0)))
      throw Error('Silent candidate: ' + sound.id);
    return { channels, level };
  }),
);
const target = Math.min(...takes.flat().map((t) => t.level));
const choices = sounds.map((sound, index) => ({
  id: sound.id,
  takes: takes[index].map(({ channels, level }) =>
    wav(channels.map((c) => c.map((s) => s * 10 ** ((target - level) / 20) * 0.7))),
  ),
}));
const bed = await recipe(values.bed ?? 'light-rain-loop');
if (!bed.loopable) throw Error('Choose a loopable background');
const bedAudio = renderChannels(bed, { level: 'balanced' });
const bedLevel = Math.max(...bedAudio.map((c) => measureLevel(c, SAMPLE_RATE).activeDb));
const bedGain = Math.min(0.27, 0.7 * 10 ** ((target - 8 - bedLevel) / 20));
const data = { startDry: Boolean(values.isolated), choices, bedId: bed.id, bed: wav(bedAudio.map((c) => c.map((s) => s * bedGain))) };
const reel = createHash('sha256').update(JSON.stringify(data)).digest('hex').slice(0, 16);
const payload = JSON.stringify({ reel, ...data }).replaceAll('<', '\\u003c');
const player = await readFile(new URL('./audition-player.js', import.meta.url), 'utf8');
const template = await readFile(new URL('../references/audition.html', import.meta.url), 'utf8');
const path = resolve(values.out);
await mkdir(dirname(path), { recursive: true });
await writeFile(
  path,
  template.replace('__PLAYER__', () => player).replace('__AUDIO__', () => payload),
);
console.log(
  JSON.stringify({
    file: path,
    candidates: sounds.map((r) => r.id),
    takes: 10,
    matchedActiveDb: target,
    bed: bed.id,
  }),
);
