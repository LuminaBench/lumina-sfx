import { biquad, clamp, envelope, layer, mix, noise, punch, renderSamples, TAU, tone, waveshape } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

type Road = 'asphalt' | 'gravel' | 'mud' | 'cobble';

function cabinContact(ctx: RenderContext, resonance: number, decay: number, bite: number): Float32Array {
  const output = punch(ctx, [
    { color: 'pink', kind: 'bandpass', hz: resonance, q: 0.9, gain: 0.88, attack: 0.001, decay },
    { color: 'white', kind: 'bandpass', hz: resonance * 5.7, q: 0.7, gain: bite, attack: 0.0005, decay: decay * 0.33 },
  ]);
  mix(output, tone(ctx, () => resonance * 0.92, (t) => envelope(t, 0.002, decay * 0.55)), 0.16);
  return output;
}

export function roadBed(ctx: RenderContext, material: Road, speed: number): Float32Array {
  const texture = noise(ctx.random, 'white');
  const tread = noise(ctx.random, 'pink');
  const body = biquad('lowpass', 260 + 220 * speed, 0.7, ctx.sampleRate);
  const grit = biquad('bandpass', material === 'gravel' ? 2370 : material === 'mud' ? 790 : 1280, 0.78, ctx.sampleRate);
  const phase = ctx.random() * TAU;
  const shell = renderSamples(ctx, (t) => {
    const source = texture();
    const turn = 0.83 + 0.13 * Math.sin(TAU * (1.38 + 4.1 * speed) * t + phase)
      + 0.04 * Math.sin(TAU * 5.41 * t);
    const motor = Math.sin(TAU * (42 + 16 * speed) * t) + 0.33 * Math.sin(TAU * (84 + 32 * speed) * t + 1.8);
    const cabin = body(tread()) * (material === 'asphalt' ? 0.86 : 0.52) + motor * 0.043;
    return cabin + grit(source) * turn * (material === 'asphalt' ? 0.17 : 0.13);
  });
  if (material === 'asphalt') return shell;
  const duration = ctx.frames / ctx.sampleRate;
  const interval = { gravel: 0.036, mud: 0.159, cobble: 0.113 }[material] / (0.67 + speed * 0.8);
  let at = -interval / 3;
  while (at < duration) {
    const wobble = ctx.random();
    const length = material === 'gravel' ? 0.037 : material === 'mud' ? 0.104 : 0.059;
    const center = material === 'gravel' ? 590 + wobble * 980 : material === 'mud' ? 75 + wobble * 100 : 135 + wobble * 70;
    const attack = material === 'mud' ? 0.0095 : 0.0012;
    const gain = (0.28 + ctx.random() * 0.50) * (material === 'cobble' ? 0.69 : 0.79);
    if (at >= 0) layer(ctx, shell, at, length, (tap) => punch(tap, [
      { color: 'pink', kind: 'bandpass', hz: center, q: 0.84, gain: 0.85, attack, decay: length * 0.37 },
      { color: 'white', kind: 'bandpass', hz: center * 4.43, q: 0.67, gain: material === 'gravel' ? 0.43 : 0.1, attack, decay: length * 0.23 },
    ]), gain);
    at += interval * (material === 'cobble' ? 0.88 + ctx.random() * 0.30 : 0.62 + ctx.random() * 0.76);
  }
  return shell;
}

export function suspensionEvent(ctx: RenderContext, kind: 'bump' | 'joint' | 'pothole', speed: number): Float32Array {
  const length = ctx.frames / ctx.sampleRate;
  const out = new Float32Array(ctx.frames);
  const back = (kind === 'bump' ? 0.63 : 0.35) - speed * 0.22;
  const center = kind === 'bump' ? 92 : kind === 'joint' ? 202 : 134;
  const decay = kind === 'bump' ? 0.073 : kind === 'joint' ? 0.023 : 0.044;
  const bite = kind === 'joint' ? 0.74 : 0.19;
  layer(ctx, out, 0, 0.28, (hit) => cabinContact(hit, center, decay, bite));
  if (kind !== 'pothole') {
    layer(ctx, out, back, 0.31, (hit) => cabinContact(hit, center * 0.84, decay * 1.27, bite * 0.81), 0.84);
  }
  if (kind === 'pothole') {
    layer(ctx, out, 0.035, 0.23, (hit) => cabinContact(hit, 76, 0.07, 0.13), 0.47);
    layer(ctx, out, 0.069, 0.17, (hit) => cabinContact(hit, 402, 0.029, 0.31), 0.3);
  }
  const am = biquad('lowpass', 800 + speed * 220, 0.67, ctx.sampleRate);
  const roll = noise(ctx.random, 'pink');
  mix(out, renderSamples(ctx, (t) => am(roll()) * Math.max(0, 1 - t / length)), 0.11);
  return out;
}

export function puddleSplash(ctx: RenderContext, force: number): Float32Array {
  const out = new Float32Array(ctx.frames);
  for (const [at, gain] of [[0, 1], [0.25 - force * 0.068, 0.73]] as const) {
    layer(ctx, out, at, 0.63, (spray) => punch(spray, [
      { color: 'pink', kind: 'bandpass', hz: 700, q: 0.5, gain: 0.92, attack: 0.017, decay: 0.092 },
      { color: 'white', kind: 'bandpass', hz: 3200 + 950 * force, q: 0.64, gain: 0.75, attack: 0.009, decay: 0.116 },
      { color: 'brown', kind: 'bandpass', hz: 145, q: 0.71, gain: 0.53, attack: 0.007, decay: 0.061 },
    ]), gain);
  }
  for (let i = 0; i < 18; i++) {
    const at = 0.026 + ctx.random() ** 1.75 * 0.61;
    layer(ctx, out, at, 0.058, (drop) => cabinContact(drop, 390 + ctx.random() * 860, 0.0085, 0.27), (1 - at) * 0.2);
  }
  return out;
}

type Control = 'handbrake-pull' | 'handbrake-release' | 'gear-lever' | 'heater-control' | 'door-handle';

export function cabinControl(ctx: RenderContext, kind: Control, force: number): Float32Array {
  const output = new Float32Array(ctx.frames);
  const impacts: Record<Control, readonly (readonly [number, number, number, number])[]> = {
    'handbrake-pull': [[0, 380, 0.46, 0.60], [0.022, 800, 0.69, 0.79], [0.048, 850, 0.87, 0.87],
      [0.075, 935, 0.88, 0.83], [0.107, 980, 0.86, 0.81], [0.148, 510, 1, 0.75]],
    'handbrake-release': [[0, 1000, 0.58, 0.52], [0.05, 540, 0.31, 0.27], [0.148, 279, 1, 0.42]],
    'gear-lever': [[0, 385, 0.63, 0.4], [0.043, 535, 0.29, 0.47], [0.13, 520, 1, 0.55], [0.142, 375, 0.42, 0.21]],
    'heater-control': [[0, 1320, 0.93, 0.66], [0.078, 1480, 0.82, 0.59], [0.171, 1640, 1, 0.75]],
    'door-handle': [[0, 614, 0.44, 0.54], [0.026, 435, 0.87, 0.69], [0.127, 535, 0.55, 0.58]],
  };
  for (const [at, center, level, edge] of impacts[kind]) {
    const detune = 0.97 + 0.06 * ctx.random();
    const strike = at * (1.16 - force * 0.29) * (0.97 + ctx.random() * 0.06);
    layer(ctx, output, strike, 0.102, (hit) => cabinContact(hit, center * detune, 0.012 + 0.013 * (1 - force), edge), level);
  }
  if (kind === 'gear-lever' || kind === 'handbrake-release' || kind === 'door-handle') {
    const center = kind === 'gear-lever' ? 190 : kind === 'door-handle' ? 860 : 290;
    layer(ctx, output, 0.018, 0.15, (rattle) => punch(rattle, [
      { color: 'pink', kind: 'bandpass', hz: center, q: 0.6, gain: 0.66, attack: 0.021, decay: 0.051 },
    ]), 0.48);
  }
  return output;
}

export function hazardRelay(ctx: RenderContext, period: number, weight: number): Float32Array {
  const output = new Float32Array(ctx.frames);
  for (let at = 0; at < ctx.frames / ctx.sampleRate; at += period) {
    layer(ctx, output, at, 0.083, (click) => cabinContact(click, 1160 + 250 * weight, 0.011, 0.58), 0.83);
    layer(ctx, output, at + period * 0.47, 0.088, (click) => cabinContact(click, 690 + 270 * weight, 0.016, 0.53));
  }
  return output;
}

export function cabinVent(ctx: RenderContext, speed: number): Float32Array {
  const raw = noise(ctx.random, 'white');
  const air = biquad('bandpass', 1360 + 1350 * speed, 0.5, ctx.sampleRate);
  const occluded = biquad('lowpass', 750 + 300 * speed, 0.73, ctx.sampleRate);
  const rotor = 49 + speed * 62;
  return renderSamples(ctx, (t) => {
    const r = raw();
    const angle = TAU * rotor * t;
    return air(r) * (0.26 + 0.14 * speed) + occluded(r) * 0.48
      + (Math.sin(angle) * 0.024 + Math.sin(angle * 5) * 0.011) * (0.85 + 0.15 * Math.sin(TAU * 0.63 * t));
  });
}

export function coolingExhaust(ctx: RenderContext, rate: number): Float32Array {
  const output = new Float32Array(ctx.frames);
  for (const [index, at] of [0, 0.205, 0.529, 1.069, 1.743, 2.61].entries()) {
    const center = (860 + ctx.random() * 1050) * (1 - index * 0.055);
    const time = at * (1.1 - rate * 0.23);
    layer(ctx, output, time, 0.086, (ring) => cabinContact(ring, center, 0.018 + ctx.random() * 0.014, 0.47),
      (1 - 0.11 * index) * (0.75 + 0.25 * ctx.random()));
  }
  return output;
}

export function electricDrive(ctx: RenderContext, load: number, reverse: boolean): Float32Array {
  const texture = noise(ctx.random, 'pink');
  const tire = biquad('bandpass', 1320, 0.63, ctx.sampleRate);
  let phase = ctx.random() * TAU;
  const duration = ctx.frames / ctx.sampleRate;
  return renderSamples(ctx, (t) => {
    const motion = clamp(t / (duration * 0.85), 0, 1);
    const pitch = (reverse ? 107 : 79) + (reverse ? 31 + load * 23 : 335 + load * 190) * Math.sin(motion * Math.PI / 2);
    phase += TAU * pitch * (1 + 0.003 * Math.sin(TAU * 2.7 * t)) / ctx.sampleRate;
    const fade = Math.min(1, t * 20) * Math.max(0, 1 - (motion ** 4) * 0.79);
    const motor = Math.sin(phase) * 0.034 + Math.sin(phase * 2.001 + 0.29) * 0.035
      + waveshape(Math.sin(phase * 4 + 1.15), 0.7) * 0.012 + Math.sin(phase * 5.997) * 0.008;
    const reversing = reverse ? Math.sin(TAU * 525 * t) * 0.043 * (0.84 + 0.16 * Math.sin(TAU * 1.4 * t)) : 0;
    return (motor + reversing + tire(texture()) * (0.28 + motion * 0.22)) * fade;
  });
}
