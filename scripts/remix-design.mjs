import { readFile, realpath } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { selectRecipes } from './install-files.mjs';
import { loadRecipes } from './recipes.mjs';
import { composeRecipe } from '../engine/remix.ts';

function fields(value, label, allowed) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Expected an object for ' + label);
  if (allowed)
    for (const key of Object.keys(value))
      if (!allowed.includes(key)) throw Error('Unknown ' + label + ' field: ' + key);
}
const designKeys = ['id', 'name', 'style', 'layers', 'macros', 'spectrum'];
const layerKeys = [
  'id',
  'design',
  'gain',
  'params',
  'macros',
  'offsetSec',
  'fromMarker',
  'durationSec',
  'envelope',
  'label',
  'fitSec',
  'afterLayer',
  'atMarker',
  'muffle',
];
const validId = (id) => typeof id === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id);

// Resolve references relative to the containing design. The export embeds the arrangement,
// so a game never depends on the original design JSON or any studio path.
export async function loadDesign(input, directory = process.cwd()) {
  const ids = new Set();
  let leaves = 0;
  async function parse(input, directory, ancestors, depth) {
    if (depth > 8) throw Error('A design supports eight nested groups');
    if (typeof input === 'string') {
      if (!input.endsWith('.json')) throw Error('Design references must be JSON files');
      const path = await realpath(resolve(directory, input));
      if (ancestors.includes(path)) throw Error('Circular design reference: ' + path);
      return parse(JSON.parse(await readFile(path, 'utf8')), dirname(path), [...ancestors, path], depth);
    }
    fields(input, 'design', designKeys);
    const { layers, ...design } = input;
    if (!validId(design.id) || (design.name !== undefined && typeof design.name !== 'string'))
      throw Error('Expected a hyphenated sound id and optional name');
    if (!Array.isArray(layers) || layers.length < 1 || layers.length > 4)
      throw Error('Choose one to four layers per group');
    const children = [];
    for (const layer of layers) {
      fields(layer, 'layer', layerKeys);
      const { id, design: nested, ...settings } = layer;
      if ((id === undefined) === (nested === undefined)) throw Error('Each layer needs one id or design');
      if (settings.params !== undefined) fields(settings.params, 'params');
      if (settings.macros !== undefined) fields(settings.macros, 'layer macros');
      if (settings.atMarker !== undefined) fields(settings.atMarker, 'anchor', ['layer', 'name', 'shiftSec']);
      if (settings.afterLayer !== undefined) fields(settings.afterLayer, 'end anchor', ['layer', 'shiftSec']);
      if (settings.muffle !== undefined) fields(settings.muffle, 'muffle', ['cutoffHz', 'envelope']);
      if (nested !== undefined)
        children.push({ child: await parse(nested, directory, ancestors, depth + 1), settings });
      else {
        if (!validId(id)) throw Error('Invalid base recipe id');
        if (++leaves > 64) throw Error('A design supports 64 source layers');
        ids.add(id);
        children.push({ id, settings });
      }
    }
    if (design.macros !== undefined) fields(design.macros, 'design macros');
    return { design, children };
  }
  const root = await parse(input, directory, [], 1);
  if (ids.has(root.design.id)) throw Error('Choose an output ID distinct from its base recipes');
  const selected = await selectRecipes([...ids]);
  const byId = new Map((await loadRecipes(ids)).map((recipe) => [recipe.id, recipe]));
  const imports = new Map(selected.map((r, i) => [r.id, 'layer' + (i + 1)]));
  const code = [
    "import { composeRecipe } from '../engine/remix.ts';",
    ...selected.map((r) => 'import ' + imports.get(r.id) + " from './" + r.id + ".ts';"),
    '',
  ];
  let groups = 0;
  function build(node) {
    const entries = [],
      layers = [];
    for (const { id, child, settings } of node.children) {
      const resolved = child ? build(child) : { recipe: byId.get(id), symbol: imports.get(id) };
      layers.push({ recipe: resolved.recipe, ...settings });
      const props = Object.entries(settings).map(([key, val]) => key + ': ' + JSON.stringify(val));
      entries.push('  { ' + ['recipe: ' + resolved.symbol, ...props].join(', ') + ' },');
    }
    const symbol = 'group' + ++groups;
    code.push(
      'const ' + symbol + ' = composeRecipe(' + JSON.stringify(node.design, null, 2) + ', [',
      ...entries,
      ']);',
      '',
    );
    return { recipe: composeRecipe(node.design, layers), symbol };
  }
  const { recipe, symbol } = build(root);
  code.push('export default ' + symbol + ';', '');
  return { recipe, selected, source: code.join('\n') };
}
