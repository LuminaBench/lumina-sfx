import assert from 'node:assert/strict';
import { renderChannels } from '../engine/render.ts';
import { loadRecipes } from '../scripts/recipes.mjs';

const ids = ['silk-swipe-left', 'silk-swipe-right', 'laptop-scissor-keyboard-key-down',
  'laptop-scissor-keyboard-typed-word'];
const bank = new Map((await loadRecipes(new Set(ids))).map(r => [r.id, r]));
const energy = pcm => pcm.reduce((sum, x) => sum + x*x, 0) / pcm.length;

for (const rate of [8000, 44100, 48000]) {
  const [left, right] = renderChannels(bank.get('silk-swipe-right'), {seed:7}, rate);
  const [mirrorLeft, mirrorRight] = renderChannels(bank.get('silk-swipe-left'), {seed:7}, rate);
  const span = Math.round(left.length * .22);
  assert.ok(energy(left.subarray(0,span)) > 3*energy(right.subarray(0,span)));
  assert.ok(energy(right.subarray(-span)) > 3*energy(left.subarray(-span)));
  assert.ok(left.every((v,i) => Math.abs(v-mirrorRight[i]) < 1e-6));
  assert.ok(right.every((v,i) => Math.abs(v-mirrorLeft[i]) < 1e-6));
}

// Count distinct contacts as an editor would cut them, ignoring the oscillations within one strike.
function contactCount(id, seed) {
  const [pcm] = renderChannels(bank.get(id), {seed}, 44100);
  const blocks = [];
  for (let start = 0; start < pcm.length; start += 220) blocks.push(energy(pcm.subarray(start,start+220)));
  const gate = Math.max(...blocks)*.02;
  let count = 0, quiet = 10;
  for (const power of blocks) {
    if (power < gate) quiet++;
    else { if (quiet >= 6) count++; quiet = 0; }
  }
  return count;
}
for (const seed of [7, 818, 104729]) {
  assert.equal(contactCount('laptop-scissor-keyboard-key-down', seed), 1);
  assert.equal(contactCount('laptop-scissor-keyboard-typed-word', seed), 4);
}
console.log('Verified stereo travel, mirrored swipes, and single-key versus typed-word timing.');
