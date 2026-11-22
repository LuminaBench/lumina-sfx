import assert from 'node:assert/strict';
import { composeRecipe, renderChannels, renderSound } from '../engine/index.ts';
import { rankByIntent } from '../scripts/intent-search.mjs';

function sine(hz) {
  return { id: 'probe-' + hz, name: 'Probe', category: 'Sci-Fi & UI', tags: [], loopable: false,
    durationSec: 1, params: {}, render: ctx => Float32Array.from({ length: ctx.frames },
      (_, i) => 0.3 * Math.sin(2 * Math.PI * hz * i / ctx.sampleRate)) };
}
const first = { recipe: sine(320), label: 'first' }, second = { recipe: sine(680) };
const compose = (layers, brief = {}) => composeRecipe({ id: 'study', ...brief }, layers);
const join = seconds => ({ ...second, afterLayer: { layer: 'first', crossfadeSec: seconds } });
const joined = compose([first, join(0.25)]);
assert.equal(joined.durationSec, 1.75);
for (const rate of [8000, 44100, 48000]) {
  const pcm = joined.render({ frames: rate * 1.75, sampleRate: rate, random: () => .5 }, { seed: 1, params: {} });
  const a = renderChannels(first.recipe, {seed: 1}, rate)[0];
  const b = renderChannels(second.recipe, {seed: 8192}, rate)[0];
  const start = Math.round(rate * .75), span = Math.round(rate * .25);
  for (let i = 0; i < span; i += 11) {
    const angle = Math.PI * 0.5 * i / span;
    const expected = a[start+i] * Math.cos(angle) + b[i] * Math.sin(angle);
    assert.ok(Math.abs(pcm[start+i] - expected) < 1e-6);
  }
}
assert.throws(() => compose([first, join(1.1)]), /crossfade/i);
assert.throws(() => compose([first, join(.2), join(.1)]), /crossfade/i);
assert.throws(() => compose([first, { ...join(.1), durationSec: .05 }]), /incoming/i);
assert.throws(() => compose([first, { ...second, afterLayer: { layer:'first', shiftSec:.2, crossfadeSec:.1 } }]), /crossfade/i);

const tune = { recipe:sine(440), tune:{ sourceHz:440, intervalSemitones:7 } };
const tuned = compose([tune], {tonicHz:220});
const rate = 24000, pcm = renderSound(tuned, {}, rate);
const start = rate * .25, end = rate * .75;
let crossings = 0;
for (let i = start; i < end; i++) if (pcm[i] < 0 && pcm[i+1] >= 0) crossings++;
const hz = crossings * rate / (end-start);
assert.ok(Math.abs(hz - 329.63) < 4, 'Expected the tuned fifth, got '+hz);
assert.equal(pcm.length, rate);
assert.throws(() => compose([tune]), /tonicHz/);
assert.throws(() => compose([{...tune, macros:{pitchShift:1}}], {tonicHz:220}), /tuning/i);

const params = { force: { label:'Force', min:0, max:1, default:.5 } };
const layer = { recipe:{...first.recipe, params}, role:'accent', paramsByMood:{calm:{force:.2}, dramatic:{force:.8}} };
assert.equal(compose([layer], {mood:'calm'}).params.force.default, .2);
assert.equal(compose([layer], {mood:'dramatic'}).params.force.default, .8);
assert.throws(() => compose([{...layer,paramsByMood:{dramatic:{bad:1}}}], {mood:'calm'}), /parameter/);
assert.throws(() => compose([first], {mood:'unknown'}), /mood/);
assert.deepEqual(renderSound(compose([first,second])),renderSound(compose([first,second],{mood:'neutral'})));
// Inspect the raw mix so mastering cannot hide a change in the foreground balance.
function strength(frequency, mood, role) {
  const scene = compose([{ recipe: sine(frequency), role }], { mood });
  const samples = scene.render({ frames: 44100, sampleRate: 44100, random: () => .5 }, { seed: 1, params: {} });
  return Math.sqrt(samples.slice(4410).reduce((sum, sample) => sum + sample ** 2, 0) / 39690);
}
const softHighs = strength(8000, 'calm', 'accent') / strength(8000, 'neutral', 'accent');
const softLows = strength(400, 'calm', 'accent') / strength(400, 'neutral', 'accent');
assert.ok(softHighs < softLows * .4 && softLows > .35 && softLows < .45);
assert.ok(strength(400, 'dramatic', 'accent') > strength(400, 'dramatic', 'bed'));
const documents = [{id:'quiet-surf',name:'Quiet breakers',tags:['surf','quiet']},
  {id:'heavy-surf',name:'Heavy breakers',tags:['surf','heavy']}, {id:'calm-menu',name:'Calm menu',tags:['calm']}];
for (const [query,id,mood] of [['relaxing surf','quiet-surf','calm'],['intense surf','heavy-surf','dramatic']]) {
  const results = rankByIntent(documents,query);
  assert.equal(results[0].id,id); assert.equal(results[0].suggestedMood,mood);
  assert.ok(results.every(r => r.tags.includes('surf')));
}
assert.equal(rankByIntent(documents,'calm surf not dramatic')[0].suggestedMood,'calm');
assert.equal(rankByIntent(documents,'calm surf then dramatic surf')[0].suggestedMood,undefined);
console.log('Passed mood retrieval, native controls, equal-power overlaps at three sample rates and measured harmonic tuning.');
