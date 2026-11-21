import { biquad, envelope, mix, noise, punch, renderSamples, sweep, TAU, tone } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

interface Energy {
  from: number;
  to: number;
  bend: number;
  decay: number;
  grit: number;
  body: number;
}

export function energyShot(ctx: RenderContext, { from, to, bend, decay, grit, body }: Energy): Float32Array {
  const jitter = 0.94 + ctx.random() * 0.12;
  const shape = (t: number) => envelope(t, 0.0018, decay);
  const sound = tone(ctx, (t) => sweep(from * jitter, to, bend, t), shape, (p, t) => {
    const fm = Math.sin(p * 1.62) * (1.85 + grit * 2.71) * Math.exp(-t / (bend * 1.11));
    return Math.sin(p + fm) * 0.81 + Math.sin(p * 0.54 + Math.sin(p * 2.05) * 0.43) * body * 0.51;
  });
  mix(sound, punch(ctx, [
    { color: 'white', kind: 'bandpass', hz: 1900 + from * 0.43, gain: 0.87 + grit * 0.36, attack: 0.00022, decay: 0.0127 },
    { color: 'pink', kind: 'bandpass', hz: 311, gain: body * 0.73, attack: 0.0032, decay: decay * 0.39 },
  ]));
  return sound;
}

function bladeTone(phase: number, modulation: number): number {
  return 0.57 * Math.sin(phase + 0.82 * Math.sin(2.43 * phase + modulation)) +
    0.35 * Math.sin(phase * 0.745 + 0.45 * Math.sin(2.09 * phase)) +
    0.15 * Math.sin(phase * 2.37 + modulation);
}

export function bladeIgnition(ctx: RenderContext, colour: number): Float32Array {
  const air = noise(ctx.random, 'white');
  const sizzle = biquad('bandpass', 4110 + 2500 * colour, 0.95, ctx.sampleRate);
  const pitch = (t: number) => 198 + colour * 64 + 645 * Math.exp(-t / 0.044) -
    690 * Math.exp(-t / 0.011);
  const sound = tone(ctx, pitch, (t) => envelope(t, 0.024, 0.38),
    (p, t) => bladeTone(p, 0.61 * Math.sin(t * TAU * 19)));
  return renderSamples(ctx, (t, i) => sound[i] +
    sizzle(air()) * 1.08 * envelope(t, 0.0012, 0.057));
}

export function bladeHum(ctx: RenderContext, period: number, edge: number): Float32Array {
  const current = noise(ctx.random, 'pink');
  const flux = noise(ctx.random, 'brown');
  const air = biquad('bandpass', 915 + 681 * edge, 0.73, ctx.sampleRate);
  const sparks = biquad('bandpass', 2320 + 1100 * edge, 1.25, ctx.sampleRate);
  const fluxBand = biquad('lowpass', 19, 0.70, ctx.sampleRate);
  const floor = biquad('highpass', 61, 0.70, ctx.sampleRate);
  const base = (167 + ctx.random() * 8) * (0.95 + edge * 0.14);
  let near = ctx.random() * TAU;
  let far = ctx.random() * TAU;
  return renderSamples(ctx, (t) => {
    const phase = TAU * t / period;
    const drift = 0.021 * Math.sin(phase * 3 + 0.34) + 0.009 * Math.cos(phase * 7);
    const texture = current();
    const charge = fluxBand(flux());
    near += TAU * base * (1 + drift + charge * 0.12) / ctx.sampleRate;
    far += TAU * (base * 1.47 + 1.8 * Math.sin(phase * 5)) / ctx.sampleRate;
    const coil = Math.sin(near + 0.51 * Math.sin(far * 1.41)) * (0.66 + 0.18 * Math.sin(phase * 2)) +
      Math.sin(far + 0.45 * Math.cos(near * 2.07)) * (0.31 + 0.17 * Math.cos(phase * 5 + 0.52));
    const pressure = 0.70 + Math.min(0.39, 8.5 * Math.abs(charge));
    const fizz = air(texture) * (0.62 + 0.22 * Math.sin(phase * 7 + 0.76)) +
      sparks(texture) * (0.30 + edge * 0.33) * pressure;
    return floor(Math.tanh(coil * (1.08 + edge * 0.51)) * 0.75 + fizz);
  });
}

export function bladeSwing(ctx: RenderContext, speed: number): Float32Array {
  const pass = 0.126 - speed * 0.062;
  const air = noise(ctx.random, 'white');
  const rush = biquad('bandpass', 1970 + speed * 2120, 0.75, ctx.sampleRate);
  const contour = (t: number) => envelope(t, pass, 0.067);
  const sound = tone(ctx, (t) => 149 + 274 / (1 + Math.exp((t - pass) / 0.017)), contour,
    (p, t) => bladeTone(p, Math.cos(TAU * t * 37)));
  return renderSamples(ctx, (t, i) => sound[i] * 0.85 + rush(air()) * contour(t) * (0.58 + speed * 0.39));
}

export function chargeUp(ctx: RenderContext, edge: number): Float32Array {
  const hiss = noise(ctx.random, 'pink');
  const crackle = biquad('bandpass', 1900 + 2630 * edge, 1.3, ctx.sampleRate);
  const sound = tone(ctx, (t) => 185 + (1 - Math.exp(-t / 0.37)) ** 1.72 * (410 + edge * 420),
    (t) => Math.min(1, t / 0.145) * Math.exp(-Math.max(0, t - 0.80) / 0.14),
    (p, t) => (Math.sin(p + Math.sin(p * 2.11) * (0.3 + edge * 2.83 * t)) + 0.31 * Math.sin(p * 0.535)) *
      (0.80 + 0.20 * Math.cos(TAU * (14 * t + 18 * t * t))));
  return renderSamples(ctx, (t, i) => sound[i] + crackle(hiss()) * envelope(t, 0.23, 0.69) * 0.67);
}
