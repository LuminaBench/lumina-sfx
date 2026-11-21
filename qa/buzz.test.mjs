import assert from 'node:assert/strict';
import { spectrum } from './metrics.mjs';
import { rng } from '../engine/dsp.ts';
const rate = 44100;
const random = rng(2913);
function probe(fn) {
  return spectrum(Float32Array.from({ length: rate }, (_, i) => fn(i / rate)), rate, true).buzz;
}
const stack = phase => Math.sin(phase) + .42*Math.sin(phase*2) + .26*Math.sin(phase*3);
assert.equal(probe(t => .2*stack(2*Math.PI*220*t)).pass, false);
assert.equal(probe(() => .2*(random()-.5)).pass, true);
assert.equal(probe(t => .2*stack(2*Math.PI*(210*t+55*t*t)) * Math.sin(12*t)**4).pass, true);
assert.equal(probe(t => .2*stack(2*Math.PI*185*t)*Math.exp(-9*t)).pass, true);
