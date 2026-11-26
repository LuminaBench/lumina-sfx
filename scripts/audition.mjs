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
    'use-case':{type:'string'}, clean: { type:'boolean' }, isolated: { type: 'boolean' },
    moods: { type: 'boolean' },
    styles: { type: 'boolean' },
    bed: { type: 'string' },
    out: { type: 'string' },
    help: { type: 'boolean' },
  },
});
if (values.help) {
  console.log(
    'npm run audition -- <id-or-design.json> <id-or-design.json> [third] (or one candidate with --styles or --moods) [--clean] [--isolated] --bed <loop-id> --out <desk.html>',
  );
  process.exit(0);
}
const performances = new Set(), components = new Set();
function remember(source){
  performances.add(source.id);
  for(const component of source.components??[])components.add(component);
}
if (values.styles && values.moods) throw Error('Compare either styles or moods');
if ((values.styles || values.moods ? inputs.length !== 1 : ![2, 3].includes(inputs.length)) || !values.out)
  throw Error('Choose two or three candidates and an --out HTML file');
async function recipe(id) {
  const [sound] = await loadRecipes(new Set([id]));
  if (!sound) throw Error('Unknown sound: ' + id);
  return sound;
}
async function candidate(input, style, mood) {
  async function group(design, directory) {
    const {recipe, selected} = await loadDesign(design, directory);
    if (values.clean || values.isolated) await checkIsolatedRecipes(selected, {clean:values.clean});
    selected.forEach(remember);
    return recipe;
  }
  if (mood) {
    const spec = input.endsWith('.json') ? JSON.parse(await readFile(input, 'utf8')) :
      { id: input, layers: [{ id: input }] };
    return group({ ...spec, id: spec.id + '-' + mood, mood }, dirname(resolve(input)));
  }
  if (!input.endsWith('.json')) {
    const base = await recipe(input);
    remember(base);
    if (values.clean || values.isolated) await checkIsolatedRecipes(await selectRecipes([input]), {clean:values.clean});
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
  values.moods ? ['neutral', 'calm', 'dramatic'].map(mood => candidate(inputs[0], undefined, mood)) : values.styles
    ? Object.keys(sceneStyles).map((style) => candidate(inputs[0], style))
    : inputs.map((input) => candidate(input)),
);
if (new Set(sounds.map((r) => r.id)).size !== sounds.length) throw Error('Each candidate needs a distinct ID');
const takes = sounds.map((sound) =>
  Array.from({ length: sound.preserveTimeline ? 1 : 10 }, (_, i) => {
    const channels = preview(sound, sound.preserveTimeline ? DEFAULT_SEED : DEFAULT_SEED + i * 8191);
    const level = Math.max(...channels.map((c) => measureLevel(c, SAMPLE_RATE).activeDb));
    if (!Number.isFinite(level) || channels.every((c) => c.every((s) => s === 0)))
      throw Error('Silent candidate: ' + sound.id);
    return { channels, level };
  }),
);
const target = Math.min(...takes.flat().map((t) => t.level));
const bank = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url), 'utf8')).sounds;
const revisions = new Map(bank.map(s => [s.id, s.revision ?? 1]));
const choices = sounds.map((sound, index) => ({
  id: sound.id, revision: revisions.get(sound.id),
  takes: takes[index].map(({ channels, level }) =>
    wav(channels.map((c) => c.map((s) => s * 10 ** ((target - level) / 20) * 0.7))),
  ),
}));
let background = null;
if (values.bed) {
  const bed = await recipe(values.bed);
  if (!bed.loopable) throw Error('Choose a loopable background');
  if(performances.has(bed.id) || bed.components?.some(c=>components.has(c)))
    throw Error('The review background already occurs in a candidate. Audition the existing mix solo.');
  if(values.clean) await checkIsolatedRecipes(await selectRecipes([bed.id]), {clean:true});
  const channels = renderChannels(bed, { level:'balanced' });
  const level = Math.max(...channels.map(c=>measureLevel(c,SAMPLE_RATE).activeDb));
  const gain = Math.min(.27,.7*10**((target-8-level)/20));
  background = wav(channels.map(c=>c.map(x=>x*gain)));
}
const data = {useCase:values['use-case']?.trim(),startDry:!background || Boolean(values.clean || values.isolated), choices, bedId:values.bed??null,bed:background};
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
    takes: takes.map(t=>t.length),
    matchedActiveDb: target,
    bed: data.bedId,
  }),
);
