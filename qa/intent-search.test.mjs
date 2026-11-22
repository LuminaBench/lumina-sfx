import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
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
