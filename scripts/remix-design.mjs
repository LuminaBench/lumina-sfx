import { readFile, realpath } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { checkIsolatedRecipes, selectRecipes } from './install-files.mjs';
import { loadRecipes } from './recipes.mjs';
import { composeRecipe } from '../engine/remix.ts';

function fields(value, label, allowed) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw Error('Expected an object for ' + label);
  if (allowed)
    for (const key of Object.keys(value))
      if (!allowed.includes(key)) throw Error('Unknown ' + label + ' field: ' + key);
}
const designKeys = ['id', 'name', 'style', 'mood', 'tonicHz', 'layers', 'macros', 'spectrum'];
const layerKeys = [
  'id',
  'design',
  'gain',
  'role',
  'under',
  'paramsByMood',
  'tune',
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
export async function loadDesign(input, directory = process.cwd(), mood, inspect) {
  const ids = new Set(), cleanIds = new Set();
  let leaves = 0;
  let spatial=false, headphones=false;
  async function parse(input, directory, ancestors, depth, clean = false) {
    if (depth > 8) throw Error('A design supports eight nested groups');
    if (typeof input === 'string') {
      if (!input.endsWith('.json')) throw Error('Design references must be JSON files');
      const path = await realpath(resolve(directory, input));
      if (ancestors.includes(path)) throw Error('Circular design reference: ' + path);
      return parse(JSON.parse(await readFile(path, 'utf8')), dirname(path), [...ancestors, path], depth, clean);
    }
    const listening=input?.schemaVersion===2;
    fields(input, 'design', listening ? [...designKeys,'schemaVersion','viewpoint','balance','scope','sourcePolicy','focus','listener','output'] : designKeys);
    if (listening) {
      if(input.viewpoint!==undefined && typeof input.viewpoint!=='string') throw Error('Expected a viewpoint description');
      if(input.listener) {
        fields(input.listener,'listener',['position','path','yaw','pitch','roll']);
        for(const pose of input.listener.path??[]) fields(pose,'listener key',['at','position','yaw','pitch','roll']);
      }
      spatial=true; headphones ||= input.output==='headphones';
      if(input.focus) {
        fields(input.focus,'focus',['subjects','marginDb','moments']);
        for(const m of input.focus.moments??[]) fields(m,'focus moment',['from','to','subjects','marginDb']);
      }
    }
    const { layers, ...design } = input;
    if (!validId(design.id) || (design.name !== undefined && typeof design.name !== 'string'))
      throw Error('Expected a hyphenated sound id and optional name');
    if (!Array.isArray(layers) || layers.length < 1 || layers.length > (listening?32:4))
      throw Error('Invalid layer count for this design version');
    clean ||= design.sourcePolicy === 'clean';
    const children = [];
    for (const layer of layers) {
      fields(layer, 'layer', listening ? [...layerKeys,'placement','acoustics','event','locked','maskEq'] : layerKeys);
      if(layer.acoustics) fields(layer.acoustics,'acoustics',['source','distanceM','bearingDeg','elevationDeg','through','travel']);
      if(layer.maskEq) fields(layer.maskEq,'mask EQ',['hz','cutDb','q']);
      if(layer.placement) {
        fields(layer.placement,'placement',['kind','position','path','yaw','pitch','roll','refDistance','rolloff','spread','innerAngle','outerAngle','outerGain','air','doppler','obstruction','room']);
        for(const pose of layer.placement.path??[]) fields(pose,'source key',['at','position','yaw','pitch','roll']);
      }
      const { id, design: nested, ...settings } = layer;
      if ((id === undefined) === (nested === undefined)) throw Error('Each layer needs one id or design');
      if (settings.under !== undefined) fields(settings.under, 'relative level', ['layer', 'byDb']);
      if (settings.tune !== undefined) fields(settings.tune, 'tuning', ['sourceHz', 'intervalSemitones']);
      if (settings.paramsByMood !== undefined) fields(settings.paramsByMood, 'mood parameters', ['calm', 'dramatic', 'neutral']);
      if (settings.params !== undefined) fields(settings.params, 'params');
      if (settings.macros !== undefined) fields(settings.macros, 'layer macros');
      if (settings.atMarker !== undefined) fields(settings.atMarker, 'anchor', ['layer', 'name', 'shiftSec']);
      if (settings.afterLayer !== undefined) fields(settings.afterLayer, 'end anchor', ['layer', 'shiftSec', 'crossfadeSec']);
      if (settings.muffle !== undefined) fields(settings.muffle, 'muffle', ['cutoffHz', 'envelope']);
      if (nested !== undefined)
        children.push({ child: await parse(nested, directory, ancestors, depth + 1, clean), settings });
      else {
        if (!validId(id)) throw Error('Invalid base recipe id');
        if (++leaves > 64) throw Error('A design supports 64 source layers');
        ids.add(id);
        if(clean) cleanIds.add(id);
        children.push({ id, settings });
      }
    }
    if (design.macros !== undefined) fields(design.macros, 'design macros');
    return { design, children };
  }
  const root = await parse(input, directory, [], 1);
  if (mood !== undefined) root.design.mood = mood;
  if (ids.has(root.design.id)) throw Error('Choose an output ID distinct from its base recipes');
  const selected = await selectRecipes([...ids]);
  if(cleanIds.size) await checkIsolatedRecipes(selected.filter(s => cleanIds.has(s.id)), {clean:true});
  const byId = new Map((await loadRecipes(ids)).map((recipe) => [recipe.id, recipe]));
  const imports = new Map(selected.map((r, i) => [r.id, 'layer' + (i + 1)]));
  const code = [
    "import { composeRecipe } from '../engine/remix.ts';",
    ...selected.map((r) => 'import ' + imports.get(r.id) + " from './" + r.id + ".ts';"),
    '',
  ];
  const composeSpatial=spatial ? (await import('../engine/listening-scene.ts')).composeListeningScene : undefined;
  const head=headphones ? (await import('../engine/headphones.ts')).headphoneFilter : undefined;
  const dependencies=[];
  if(spatial){
    dependencies.push('engine/listening-scene.ts');
    code.unshift("import { composeListeningScene } from '../engine/listening-scene.ts';");
  }
  if(headphones){
    dependencies.push('engine/headphones.ts');
    code.unshift("import { headphoneFilter } from '../engine/headphones.ts';");
  }
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
    const spatial=node.design.schemaVersion===2;
    code.push(
      'const ' + symbol + ' = '+(spatial?'composeListeningScene':'composeRecipe')+'(' + JSON.stringify(node.design, null, 2) + ', [',
      ...entries,
      (spatial && node.design.output==='headphones' ? '], headphoneFilter);' : ']);'),
      '',
    );
    return { recipe: spatial ? composeSpatial(node.design,layers,head,node===root?inspect:undefined) : composeRecipe(node.design, layers), symbol };
  }
  const { recipe, symbol } = build(root);
  code.push('export default ' + symbol + ';', '');
  return { recipe, selected, dependencies, source: code.join('\n') };
}
