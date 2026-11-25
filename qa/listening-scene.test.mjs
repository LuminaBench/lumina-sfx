import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { loadDesign } from '../scripts/remix-design.mjs';
import { composeListeningScene } from '../engine/listening-scene.ts';
import { relativePose, placeAudio, validatePlacement } from '../engine/spatial.ts';
import { headphoneFilter } from '../engine/headphones.ts';
import { renderChannels } from '../engine/render.ts';
import { resolveListeningBrief } from '../scripts/listening-brief.mjs';
const read = (n) =>
  readFile(new URL('../references/listening-scenes/' + n + '.json', import.meta.url), 'utf8').then(
    JSON.parse,
  );
const rate = 16000,
  ear = { position: [0, 0, 0] },
  p = { position: [1, 0, -1] };
const energy = (c) => c.reduce((s, x) => s + x * x, 0);
function run(design, layers) {
  let capture;
  const recipe = composeListeningScene(
    { schemaVersion: 2, id: 'fixture', ...design },
    layers,
    headphoneFilter,
    (x) => {
      capture = x;
    },
  );
  const channels = renderChannels(recipe, {}, rate);
  return { channels, ...capture };
}
const tone = {
  id: 'test-tone',
  name: 'Tone',
  category: 'ui',
  tags: [],
  loopable: false,
  durationSec: 1,
  params: {},
  render(ctx, { seed }) {
    const hz = 450 + (seed % 61);
    return Float32Array.from(
      { length: ctx.frames },
      (_, i) => 0.1 * Math.sin((i * 2 * Math.PI * hz) / ctx.sampleRate),
    );
  },
};
const layer = (label, extra = {}) => ({ recipe: tone, label, ...extra });
test('focus works against the sum, across array order, when the named source is a loop', async () => {
  const design = await read('cockpit-engine');
  let a, b;
  const { recipe } = await loadDesign(design, undefined, undefined, (s) => (a = s));
  const mix = renderChannels(recipe, {}, rate);
  const { recipe: other } = await loadDesign(
    { ...design, layers: [...design.layers].reverse() },
    undefined,
    undefined,
    (s) => (b = s),
  );
  assert.deepEqual(renderChannels(other, {}, rate), mix);
  const r = a.regions[0];
  assert.ok(r.measuredBeforeDb < 0);
  assert.ok(r.delivered.marginDb > 7.9);
  assert.ok(Number.isFinite(r.delivered.phoneMarginDb));
  assert.deepEqual(
    a.stems.map((s) => s.dry),
    b.stems.map((s) => s.dry),
  );
});
test('one edit preserves timestamps, take and absolute foreground level', () => {
  const layers = [layer('foot', { offsetSec: 0.25 }), layer('wind', { gain: 0.8, locked: true })];
  const a = run({ focus: { subjects: ['foot'] } }, layers);
  const b = run({ focus: { subjects: ['foot'] } }, [
    ...layers.slice(0, 1),
    layer('wind', { gain: 0.15, locked: true }),
  ]);
  assert.deepEqual(a.stems[0].dry, b.stems[0].dry);
  assert.equal(b.stems[0].offset, 0.25 * rate);
  assert.equal(a.regions[0].gain.wind, 1);
  assert.ok(a.regions[0].conflicts.length);
  const late = run({}, [layer('click', { offsetSec: 0.25 })]).channels[0];
  assert.ok(late.subarray(0, 0.25 * rate).every((x) => x === 0));
  assert.ok(energy(late.subarray(0.25 * rate)) > 0);
});
test('explicit no focus, shared focus, handoff, unknown labels and bad keyframes', () => {
  const layers = [layer('a', { gain: 0.25 }), layer('b')];
  const shared = run({ focus: { subjects: ['a', 'b'] } }, layers);
  assert.ok(shared.regions[0].gain.b < 0.3);
  const ambient = run({ focus: { subjects: [] } }, layers);
  assert.deepEqual(Object.values(ambient.regions[0].gain), [1, 1]);
  const switched = run(
    { focus: { subjects: ['a'], moments: [{ from: 0.35, to: 0.65, subjects: ['b'] }] } },
    layers,
  );
  assert.deepEqual(
    switched.regions.map((r) => r.subjects[0]),
    ['a', 'b', 'a'],
  );
  assert.ok(switched.regions[0].gain.b < 1 && switched.regions[1].gain.b === 1);
  assert.throws(() => run({ focus: { subjects: ['c'] } }, layers));
  assert.throws(() => validatePlacement({ position: [0, 0, 1], path: [{ at: -1, position: [1, 2, 3] }] }));
  assert.throws(() =>
    run({ focus: { subjects: ['a'], moments: [{ from: 0.8, to: 2, subjects: ['b'] }] } }, layers),
  );
});
test('distance, directivity, head turn, width, headlocked UI and mono', () => {
  const src = Float32Array.from({ length: rate }, (_, i) => Math.sin((2 * Math.PI * 650 * i) / rate));
  const place = (p, l = ear, mode = 'stereo') => placeAudio([src], p, l, mode, rate, 0);
  const [l, r] = place(p);
  assert.ok(energy(r) > 3 * energy(l));
  const rotated = place(p, { ...ear, yaw: 135 });
  assert.ok(energy(rotated[0]) > 4 * energy(rotated[1]));
  assert.equal(relativePose({ position: [0, 0, -10] }, ear, 0).gain, 0.1);
  const cone = { kind: 'cone', position: [0, 0, -2], outerGain: 0.1 };
  assert.ok(relativePose({ ...cone, yaw: 180 }, ear, 0).gain > 8 * relativePose(cone, ear, 0).gain);
  const locked = place({ kind: 'listener' }, { ...ear, yaw: 170 }, 'headphones');
  assert.deepEqual(locked, [src, src]);
  const m = place(p, ear, 'mono');
  assert.equal(m.length, 1);
  assert.ok(energy(m[0]) > 0);
  const area = placeAudio(
    [src, src.map((x) => -x)],
    { kind: 'area', position: [0, 0, -1], spread: 1 },
    ear,
    'stereo',
    rate,
    0,
  );
  assert.ok(energy(area[0]) > 1000);
  assert.equal(area[0][400], -area[1][400]);
});
test('measured HRIR conveys sided arrival, front/back and elevation in headphones', () => {
  const peakTime = (c) => c.indexOf(c.reduce((a, b) => (Math.abs(a) > Math.abs(b) ? a : b)));
  for (const r of [16000, 44100, 48000]) {
    const [l, right] = headphoneFilter(90, 0, r);
    assert.ok(energy(right) > energy(l) * 2);
    assert.ok(peakTime(right) < peakTime(l));
    const src = new Float32Array(r / 10);
    src[0] = 1;
    const at = (pos) => placeAudio([src], { position: pos }, ear, 'headphones', r, 0, headphoneFilter)[0];
    assert.notDeepEqual(at([0, 0, -1]), at([0, 0, 1]));
    assert.notDeepEqual(at([0, 1, 0]), at([0, -1, 0]));
  }
});
test('relative motion preserves pitch on parallel paths and shifts opposite ways on a pass', () => {
  const input = Float32Array.from({ length: rate }, (_, i) => Math.sin((2 * Math.PI * 600 * i) / rate));
  const moving = {
    position: [0, 0, -22],
    path: [
      { at: 0.5, position: [0, 0, -2] },
      { at: 1, position: [0, 0, -22] },
    ],
    doppler: true,
    rolloff: 0,
    air: 0,
  };
  const frequency = (samples, a, b) => {
    let crossings = 0;
    for (let i = a * rate; i < b * rate; i++) if (samples[i - 1] < 0 && samples[i] >= 0) crossings++;
    return crossings / (b - a);
  };
  const [out] = placeAudio([input], moving, ear, 'stereo', rate, 0);
  assert.ok(frequency(out, 0.125, 0.375) > 640);
  assert.ok(frequency(out, 0.625, 0.875) < 565);
  const [steady] = placeAudio(
    [input],
    moving,
    {
      ...moving,
      position: [0, 0, -21],
      path: [
        { at: 0.5, position: [0, 0, -1] },
        { at: 1, position: [0, 0, -21] },
      ],
    },
    'stereo',
    rate,
    0,
  );
  assert.ok(Math.abs(frequency(steady, 0.125, 0.375) - 600) <= 4);
});
test('doorway movement is reversible, stable and attenuates high frequencies', () => {
  const position = [1, 0, 0],
    obstruction = [
      [0, 1],
      [0.1, 1],
      [0.3, 0],
      [0.65, 0],
      [0.85, 1],
      [1, 1],
    ];
  const src = Float32Array.from({ length: rate }, (_, i) => Math.sin((2 * Math.PI * 5000 * i) / rate));
  const [a, b] = placeAudio([src], { position, room: 'hangar', obstruction }, ear, 'stereo', rate, 0);
  const window = (x, t) => x.subarray(t * rate, (t + 0.05) * rate);
  assert.ok(energy(window(b, 0.45)) > 4 * energy(window(b, 0.9)));
  assert.ok(a.every(Number.isFinite));
});
test('agent intent resolves the viewpoint without changing an explicit subject', async () => {
  const bank = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url))).sounds;
  const brief = await read('pilot.brief');
  const a = resolveListeningBrief(brief, bank);
  assert.equal(a.design.layers[0].id, 'interceptor-turbofan-canopy-interior-cruise-loop');
  const b = resolveListeningBrief(
    { ...brief, layers: [...brief.layers].reverse(), focus: { subjects: ['storm'] } },
    bank,
  );
  assert.deepEqual(b.design.focus.subjects, ['storm']);
  assert.deepEqual(b.design.layers, [...a.design.layers].reverse());
  const c = resolveListeningBrief({ ...brief, layers: [{ label: 'fake', query: 'imaginaryxxxx' }] }, bank);
  assert.equal(c.decision, 'review');
  assert.equal(c.design, null);
});

test('a targeted competing-band cut is applied before measuring or exporting dry stems', () => {
  const base = [layer('engine'), layer('rain')];
  const a = run({}, base),
    b = run({}, [base[0], layer('rain', { maskEq: { hz: 480, cutDb: 6, q: 0.8 } })]);
  assert.deepEqual(a.stems[0].dry, b.stems[0].dry);
  assert.ok(energy(a.stems[1].dry[0]) > 3.2 * energy(b.stems[1].dry[0]));
});
