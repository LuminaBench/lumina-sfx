import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { rankByIntent } from '../scripts/intent-search.mjs';
import { resolveListeningBrief } from '../scripts/listening-brief.mjs';
import { renderDurationSec } from '../engine/sculpt.ts';
import { loadDesign } from '../scripts/remix-design.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const search = (...args) => JSON.parse(execFileSync(process.execPath, ['scripts/search.mjs', ...args, '--json'], {cwd: root}));
assert.equal(search('--intent', 'clicky switch settings tabs', '--isolated', '--limit', '1')[0].id, 'settings-tab-walnut-detent');
assert.equal(search('--designs', '--intent', 'missile phew flying away', '--limit', '1')[0].id, 'missile-departure-whistling-away');
assert.equal(search('--designs', '--intent', 'quiet kill confirm', '--limit', '1')[0].id, 'jet-elimination-dry-latch');
assert.ok(search('--intent', 'toggle on', '--exclude', 'brass', '--limit', '5').every(x => !x.tags.includes('brass')));
assert.equal(search('--intent', 'footsteps on a wooden floor', '--isolated', '--limit', '1')[0].id, 'indoor-hardwood-shoe-step');
const floorMatches = search('--intent', 'wooden floor step without a barn creak', '--isolated', '--limit', '3');
assert.ok(floorMatches.length && floorMatches.every(cue => cue.tags.includes('footstep') && !cue.tags.includes('creak')));
assert.equal(search('--designs', '--intent', 'fire in a thunderstorm', '--limit', '1')[0].id, 'fireside-distant-thunder');
assert.ok(search('--intent', 'ordinary keyboard click', '--limit', '3').every(cue => cue.tags.includes('normal') && cue.tags.includes('single')));
assert.equal(search('--intent', 'silk swipe left', '--limit', '1')[0].id, 'silk-swipe-left');
assert.equal(search('settings-focus-felt-tick').length, 1);
assert.equal(search('--intent', 'gobbledygook').length, 0);
const templates = JSON.parse(await readFile(new URL('../references/scenes/index.json', import.meta.url)));
for (const template of templates) {
  const { recipe } = await loadDesign(root + template.file);
  assert.equal(recipe.id, template.id);
  assert.equal(recipe.isolation, template.isolation);
  assert.equal(recipe.loopable, template.loopable);
  assert.equal(renderDurationSec(recipe), template.durationSec);
}
console.log('Verified intent ranking, filtering, legacy IDs and all editable templates.');

const choose = (...args) => JSON.parse(execFileSync(process.execPath, ['scripts/choose.mjs', ...args], { cwd: root }));
assert.equal(choose('thocky mechanical keyboard click', '--isolated').cues[0].id, 'gasket-mount-keyboard-key-down');
assert.equal(choose('settings tab', '--scene').decision, 'single-cue');
assert.equal(choose('silk swipe left','settings tab','--isolated').decision, 'individual-cues');
assert.equal(choose('fire crackle','distant thunder','--scene').scene.id, 'fireside-distant-thunder');
assert.equal(choose('fire crackle','distant thunder','--isolated','--scene').scene.id, 'fireside-distant-thunder');
assert.equal(choose('ceramic jellyfish teleporter').decision, 'review');
assert.deepEqual(choose('heel', 'sole', '--scene', '--isolated').cues.map(c => c.id), ['indoor-hardwood-shoe-step']);
assert.equal(choose('heel', 'heel', '--scene', '--isolated').cues.length, 2);

for (const [query, id] of [
  ['rain only','rainfall-open-air-clean-loop'], ['just thunder','thunder-isolated-rolling-strike'],
  ['cockpit without rain','interceptor-turbofan-canopy-interior-cruise-loop'], ['fire','campfire-crackle-loop'],
  ['light rain','light-rain-loop'], ['heavy rain','heavy-storm-rain-loop'],
]) assert.equal(choose(query,'--clean').cues[0].id, id);
assert.equal(choose('rain only','--clean').cues.length, 1);

const { sounds: bank } = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url)));
for (const [prompt, expected] of [
  ['one clean UI click', 'mechanical-ui-click'],
  ['a UI click for my fantasy game', 'mechanical-ui-click'],
  ['menu tab in my jet game', 'settings-tab-walnut-detent'],
  ['switch between tabs in the settings menu', 'settings-tab-walnut-detent'],
  ['understated menu hover', 'settings-focus-felt-tick'],
  ['panel slides into view', 'silk-swipe-right'],
  ['logo sting', 'delicate-logo-close'],
  ['cinematic product trailer impact', 'clean-title-reveal-with-soft-hit'],
  ['trailer riser', 'silk-title-rise'],
  ['soft logo outro', 'delicate-logo-close'],
  ['title card lands', 'clean-title-reveal-with-soft-hit'],
  ['high energy product trailer transition', 'silk-whip-cut'],
  ['quick swish for a product demo', 'silk-whip-cut'],
  ['left to right swipe for a trailer', 'silk-swipe-right'],
  ['right to left swipe for a trailer', 'silk-swipe-left'],
  ['typed word in a product demo', 'gasket-mount-keyboard-typed-word'],
  ['single mouse click in a product video', 'desktop-mouse-press'],
  ['a toggle turns off', 'settings-toggle-off-cork'],
  ['soft UI notification', 'menu-confirm-pluck'],
]) {
  const matches = rankByIntent(bank, prompt, '', true);
  assert.equal(matches[0]?.id, expected, prompt);
  assert.deepEqual(matches[0].missing, [], prompt);
  assert.ok(matches.every(s => s.editorialAction && s.isolation === 'isolated' && !s.cleanHold && !s.auditionNote), prompt);
}
assert.equal(choose('clean professional trailer').decision, 'review');
assert.equal(rankByIntent(bank, 'epic cinematic trailer sound').length, 0);
assert.equal(choose('a portal opening in a product trailer', '--clean').cues[0].id, 'portal-unfold');
assert.equal(choose('farm-trailer-coupling').cues[0].id, 'farm-trailer-coupling');
assert.equal(rankByIntent(bank, 'tractor trailer coupling')[0].id, 'farm-trailer-coupling');
assert.equal(choose('keyboard typing', 'silk swipe left', 'title card lands', '--scene', '--clean').scene.id, 'product-trailer-interface-edit');
const resolved = resolveListeningBrief({ schemaVersion:2, scope:'mixed', layers:[
  {label:'contact', query:'clean UI click', prefer:'portal', exclude:'sci-fi'},
]}, bank);
assert.equal(resolved.design.layers[0].id, 'mechanical-ui-click');
const held = bank.map(s => s.id === 'mechanical-ui-click' ? {...s, cleanHold:['voice']} : s);
assert.equal(rankByIntent(held, 'clean UI click')[0].id, 'desktop-mouse-press');

const temp = await mkdtemp(join(tmpdir(), 'lumina-editorial-votes-'));
try {
  const file = join(temp, 'votes.json');
  const ballots = { 'portal-unfold': {revision:3, decision:'yes'}, 'mechanical-ui-click': {decision:'no'} };
  await writeFile(file, JSON.stringify({votes:ballots}));
  const current = search('--intent', 'clean UI click', '--votes', file);
  assert.equal(current[0].id, 'mechanical-ui-click');
  assert.equal(current[0].review.currentRevision, false);
  assert.ok(current.every(s => s.editorialAction === 'press'));
  ballots['mechanical-ui-click'].revision = current[0].revision;
  await writeFile(file, JSON.stringify({votes:ballots}));
  assert.equal(search('--intent', 'clean UI click', '--votes', file)[0].id, 'desktop-mouse-press');
} finally {
  await rm(temp, {recursive:true, force:true});
}
