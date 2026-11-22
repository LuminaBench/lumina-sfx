#!/usr/bin/env node
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { digest, encodeDelivery, publishAsset } from './audio-export.mjs';
import { spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { installRecipes, selectRecipes } from './install-files.mjs';
import { loadRecipes } from './recipes.mjs';

const usage = `node scripts/remix.mjs <base-id> [base-id ...] --id <new-id> --dest <game/audio>
  --punch 0..1 --size 0..1 --distance 0..1 --grit 0..1
  --space dry|small_room|hallway|outdoor_open|canyon_echo|underwater|outdoor|cavern --wetness 0..1 --speed 0.25..4 --pitchShift -24..24
  --params '{"nativeControl":0.7}' (one layer)
  --spec path/to/design.json (per-layer gain, offsetSec and params)
  --format ts|wav|ogg|opus (default ts)
  --extremes (also test native control limits)
`;
function object(value, label, allowed) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Expected an object for ' + label);
  if (allowed)
    for (const key of Object.keys(value)) {
      if (!allowed.includes(key)) throw Error('Unknown ' + label + ' field: ' + key);
    }
  return value;
}

async function main() {
  const names = ['punch', 'size', 'distance', 'space', 'grit', 'wetness', 'speed', 'pitchShift'];
  const options = Object.fromEntries(
    [...names, 'format', 'spec', 'id', 'name', 'dest', 'params'].map((k) => [k, { type: 'string' }]),
  );
  const { values: v, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      ...options,
      help: { type: 'boolean' },
      extremes: { type: 'boolean' },
    },
  });
  if (v.help) {
    console.log(usage);
    return;
  }
  if (!v.dest) throw Error('Specify --dest for the target game audio directory');
  const format = v.format ?? 'ts';
  if (!['ts','wav','ogg','opus'].includes(format)) throw Error('Expected --format ts, wav, ogg or opus');
  let spec;
  if (v.spec) {
    if (positionals.length || [v.id, v.name, v.params, ...names.map((k) => v[k])].some((x) => x !== undefined)) {
      throw Error('Supply the design in either --spec or command-line options');
    }
    spec = object(JSON.parse(await readFile(v.spec, 'utf8')), 'design', [
      'id',
      'name',
      'layers',
      'macros',
      'spectrum',
    ]);
  } else {
    if (v.params && positionals.length !== 1) throw Error('Use --spec for DSP overrides on multiple layers');
    const macros = Object.fromEntries(
      names.filter((k) => v[k] !== undefined).map((k) => [k, k === 'space' ? v[k] : Number(v[k] || NaN)]),
    );
    spec = {
      id: v.id,
      name: v.name,
      macros,
      layers: positionals.map((id) => ({ id, params: v.params ? JSON.parse(v.params) : {} })),
    };
  }
  if (typeof spec.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(spec.id))
    throw Error('Expected a lowercase hyphenated output id');
  if (spec.name !== undefined && typeof spec.name !== 'string') throw Error('Expected a sound name');
  if (!Array.isArray(spec.layers) || spec.layers.length < 1 || spec.layers.length > 4)
    throw Error('Choose 1 to 4 base sounds');
  if (spec.macros !== undefined) object(spec.macros, 'macros', names);
  for (const layer of spec.layers) {
    object(layer, 'layer', ['id', 'params', 'gain', 'offsetSec', 'macros']);
    if (typeof layer.id !== 'string' || layer.id === spec.id)
      throw Error('Choose a distinct output id and valid base IDs');
    if (layer.macros !== undefined) object(layer.macros, 'layer macros', names);
    if (layer.params !== undefined) object(layer.params, 'params');
  }
  const selected = await selectRecipes(spec.layers.map((l) => l.id));
  const byId = new Map((await loadRecipes(new Set(selected.map((s) => s.id)))).map((r) => [r.id, r]));
  const { composeRecipe } = await import('../engine/remix.ts');
  const { renderDurationSec } = await import('../engine/sculpt.ts');
  const { checkRecipe } = await import('../qa/check-recipe.mjs');
  const design = { id: spec.id, name: spec.name, macros: spec.macros, spectrum: spec.spectrum };
  const layers = spec.layers.map(({ id, ...settings }) => ({ recipe: byId.get(id), ...settings }));
  const recipe = composeRecipe(design, layers);
  const temp = await mkdtemp(join(tmpdir(), 'lumina-remix-'));
  let qa, wav;
  try {
    const master = join(temp, 'master.wav');
    qa = await checkRecipe(recipe, { extremes: v.extremes, bothLevels: true, wavPath: master });
    if (qa.pass) {
      wav = await readFile(master);
      if (digest(wav) !== qa.masterSha256) throw Error('QA master checksum mismatch');
    }
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
  if (!qa.pass) {
    console.log(
      JSON.stringify({ id: spec.id, pass: false, variants: qa.variants.filter((x) => !x.pass) }, null, 2),
    );
    process.exitCode = 1;
    return;
  }
  if (format !== 'ts') {
    const file = resolve(v.dest, spec.id + '.' + format);
    const bytes = await encodeDelivery(wav, format);
    await publishAsset(file, bytes);
    console.log(JSON.stringify({ pass: true, id: spec.id, file, format, masterSha256: qa.masterSha256,
      sha256: digest(bytes), variants: qa.variants.length, credits: [recipe.recording, ...(recipe.additionalRecordings ?? [])].filter(Boolean) }));
    return;
  }
  const imports = selected.map((r, i) => `import layer${i + 1} from './${r.id}.ts';`);
  const entries = spec.layers.map(({ id, ...settings }) => {
    const fields = Object.entries(settings).map(([k, val]) => `${k}: ${JSON.stringify(val)}`);
    fields.unshift('recipe: layer' + (1 + selected.findIndex((r) => r.id === id)));
    return '  { ' + fields.join(', ') + ' },';
  });
  const source = [
    "import { composeRecipe } from '../engine/remix.ts';",
    ...imports,
    '',
    'export default composeRecipe(' + JSON.stringify(design, null, 2) + ', [',
    ...entries,
    ']);',
    '',
  ].join('\n');
  const file = 'recipes/' + spec.id + '.ts';
  await installRecipes(selected, v.dest, { file, source });
  console.log(
    JSON.stringify(
      {
        pass: true,
        id: spec.id,
        file: resolve(v.dest, file),
        durationSec: renderDurationSec(recipe),
        channels: recipe.renderStereo ? 2 : 1,
        profiles: ['original', 'balanced'],
        variants: qa.variants.length,
        masterSha256: qa.masterSha256,
      },
      null,
      2,
    ),
  );
}

if (!process.features.typescript && !process.execArgv.includes('--experimental-strip-types')) {
  const child = spawnSync(process.execPath, ['--experimental-strip-types', ...process.argv.slice(1)], {
    stdio: 'inherit',
  });
  process.exitCode = child.status ?? 1;
} else {
  try {
    await main();
  } catch (e) {
    console.error(JSON.stringify({ pass: false, error: e.message }));
    process.exitCode = 1;
  }
}
