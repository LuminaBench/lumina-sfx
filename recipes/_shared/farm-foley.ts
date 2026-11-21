import { biquad, envelope, layer, modal, noise, punch, renderSamples, sweep, TAU, tone } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

type Contact = 'grain' | 'leaf' | 'water' | 'wood' | 'stone' | 'metal' | 'cloth' | 'snap' | 'suction' | 'rope' | 'earth';
export type FarmEvent = readonly [at: number, contact: Contact, level: number, hz: number, decay: number];

function contact(ctx: RenderContext, kind: Contact, hz: number, decay: number): Float32Array {
  if (kind === 'wood' || kind === 'metal') return modal(ctx, kind, hz, decay);
  if (kind === 'suction' || kind === 'water') {
    const falling = (time: number) => sweep(hz, hz * 0.51, decay * 0.37, time);
    const source = noise(ctx.random, 'white');
    const filter = biquad('bandpass', kind === 'water' ? hz * 2.8 : hz * 1.7, 0.63, ctx.sampleRate);
    const bubble = tone(ctx, falling, (time) => envelope(time, 0.002, decay));
    for (let i = 0; i < bubble.length; i++) {
      const t = i / ctx.sampleRate;
      bubble[i] = bubble[i] * 0.28 + filter(source()) * envelope(t, 0.001, decay * 0.77);
    }
    return bubble;
  }
  if (kind === 'grain') {
    const out = new Float32Array(ctx.frames);
    for (let t = 0; t < decay * 2.7; t += (0.002 + ctx.random() * 0.007) * (1 + t / decay)) {
      const pitch = hz * (0.55 + ctx.random() * 1.1);
      const velocity = (0.25 + ctx.random() * 0.75) * Math.exp(-t / decay);
      layer(ctx, out, t, 0.012, (shot) => punch(shot, [
        { color: 'white', kind: 'bandpass', hz: pitch, q: 0.82, gain: 1, attack: 0.00025, decay: 0.0027 },
      ]), velocity);
    }
    return out;
  }
  const edge = kind === 'snap' || kind === 'stone';
  const rough = kind === 'leaf' || kind === 'rope';
  const source = noise(ctx.random, 'white');
  const filter = biquad('bandpass', hz, edge ? 1.1 : 0.78, ctx.sampleRate);
  const body = biquad('lowpass', hz * (kind === 'earth' ? 0.32 : 0.62), 0.68, ctx.sampleRate);
  const wobble = 25 + ctx.random() * 17;
  return renderSamples(ctx, (time) => {
    const white = source();
    const chop = rough ? 0.6 + 0.4 * Math.sin(TAU * wobble * time + 3 * Math.sin(TAU * 8 * time)) : 1;
    return (filter(white) * chop + body(white) * (edge ? 0.18 : 0.84)) *
      envelope(time, edge ? 0.0005 : 0.0022, decay);
  });
}

export function farmFoley(ctx: RenderContext, force: number, events: readonly FarmEvent[]): Float32Array {
  const out = new Float32Array(ctx.frames);
  for (const [at, kind, gain, hz, decay] of events) {
    const timing = at === 0 ? 0 : at * (1.075 - force * 0.15) + ctx.random() * 0.009;
    const variation = 0.94 + ctx.random() * 0.12;
    layer(ctx, out, timing, decay * (kind === 'grain' ? 3 : 6) + 0.012,
      (shot) => contact(shot, kind, hz * variation * (0.93 + force * 0.14), decay), gain * variation);
  }
  return out;
}

interface FarmBed {
  readonly flow: number;
  readonly hiss: number;
  readonly pace: number;
  readonly pulse: number;
  readonly drops: number;
  readonly ring: number;
}

export function farmBed(ctx: RenderContext, activity: number, bed: FarmBed): Float32Array {
  const broad = noise(ctx.random, 'pink');
  const fine = noise(ctx.random, 'white');
  const flow = biquad('lowpass', bed.flow, 0.73, ctx.sampleRate);
  const hiss = biquad('bandpass', bed.hiss, 0.7, ctx.sampleRate);
  const phi = ctx.random() * TAU;
  const out = renderSamples(ctx, (time) => {
    const drift = 0.76 + 0.16 * Math.sin(TAU * bed.pace * time + phi) +
      0.08 * Math.sin(TAU * bed.pace * 1.713 * time);
    const flutter = 0.8 + 0.2 * Math.sin(TAU * bed.pulse * time + Math.sin(TAU * 0.27 * time));
    return flow(broad()) * drift * 0.55 + hiss(fine()) * (0.23 + activity * 0.24) * drift * flutter;
  });
  const duration = ctx.frames / ctx.sampleRate;
  for (let time = ctx.random() / bed.drops; time < duration; time += (0.35 + ctx.random() * 1.3) / bed.drops) {
    const hz = bed.ring * (0.58 + ctx.random() * 0.94);
    const decay = 0.008 + ctx.random() * 0.023;
    layer(ctx, out, time, 0.14, (shot) => contact(shot, 'water', hz, decay), ctx.random() * (0.17 + 0.22 * activity));
  }
  return out;
}
