import assert from 'node:assert/strict';
import { renderChannels, renderSound, renderDurationSec, composeRecipe } from '../engine/index.ts';

const rate = 24000;
const note = {
  id: 'qa-tone',
  name: 'QA tone',
  category: 'Sci-Fi & UI',
  tags: [],
  loopable: false,
  durationSec: 0.8,
  params: {},
  render(ctx) {
    return Float32Array.from(
      { length: ctx.frames },
      (_, i) => 0.3 * Math.sin((2 * Math.PI * 440 * i) / ctx.sampleRate),
    );
  },
};
const dry = renderSound(note, {}, rate);
const neutral = { punch: 0, size: 0.5, space: 'dry', distance: 0, grit: 0, speed: 1, pitchShift: 0 };
assert.deepEqual(dry, renderSound(note, { macros: neutral }, rate));
function frequency(pcm) {
  let crossings = 0;
  const from = Math.round(rate * 0.08),
    to = pcm.length - Math.round(rate * 0.07);
  for (let i = from; i < to; i++) if (pcm[i] <= 0 && pcm[i + 1] > 0) crossings++;
  return (crossings * rate) / (to - from);
}
for (const [macros, hz] of [
  [{ speed: 1.6 }, 440],
  [{ pitchShift: 12 }, 880],
  [{ speed: 0.6, pitchShift: -12 }, 220],
]) {
  const pcm = renderSound(note, { macros }, rate);
  assert.equal(pcm.length, Math.round(renderDurationSec(note, macros) * rate));
  assert.ok(Math.abs(frequency(pcm) - hz) < 8, JSON.stringify({ macros, expected: hz, actual: frequency(pcm) }));
}
for (const space of ['small_room', 'hallway', 'outdoor', 'cavern']) {
  const wet = renderSound(note, { macros: { space } }, rate);
  assert.ok(wet.length > dry.length);
  assert.ok(
    wet.subarray(dry.length).some((x) => Math.abs(x) > 0.001),
    space,
  );
}
const stereo = {
  ...note,
  renderStereo(ctx, opts) {
    const a = note.render(ctx, opts);
    return [a, a.map((x) => x * 0.6)];
  },
};
const stack = composeRecipe({ id: 'qa-stack', macros: { speed: 1.25, pitchShift: 3 } }, [
  { recipe: stereo },
  { recipe: note, gain: 0.2, offsetSec: 0.05 },
]);
const channels = renderChannels(stack, {}, rate);
assert.equal(channels.length, 2);
assert.ok(channels[0].some((x, i) => Math.abs(x - channels[1][i]) > 0.01));
assert.deepEqual(channels, renderChannels(stack, {}, rate));
assert.throws(() => renderSound(note, { macros: { grit: NaN } }, rate), /grit/);
assert.throws(() => composeRecipe({ id: 'qa-bad' }, [{ recipe: note, params: { missing: 0.1 } }]), /parameter/);
console.log(
  'Passed neutral render, speed/pitch independence, reflection tails, deterministic stereo and validation',
);
