import { biquad, envelope, layer, mix, noise, punch, renderSamples, reverb, sweep, TAU, tone } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';
import { foleyGrain } from './foley.ts';

interface Packet {
  time: number;
  from: number;
  to: number;
  bend: number;
  decay: number;
  grit: number;
  gain: number;
}

export function energyPackets(ctx: RenderContext, packets: readonly Packet[], charge: number): Float32Array {
  const sound = new Float32Array(ctx.frames);
  for (const { time, from, to, bend, decay, grit, gain } of packets) {
    const color = 0.92 + charge * 0.13 + ctx.random() * 0.06;
    const voice = (part: RenderContext) => {
      const signal = tone(part, t => sweep(from * color, to * color, bend, t), t => envelope(t, 0.0013, decay), (p, t) =>
        Math.sin(p + (0.35 + grit * 2.18 * Math.exp(-t / bend)) * Math.sin(p * 1.91)) * 0.64 +
        Math.sin(p * 0.497 + Math.cos(TAU * 37 * t) * grit * 0.85) * (0.15 + 0.26 * grit));
      mix(signal, punch(part, [
        { kind: 'bandpass', color: 'white', hz: 2600 + from * 0.7, gain: 0.8 + grit * 0.6, attack: 0.0006, decay: 0.0065 + grit * 0.011 },
        { kind: 'bandpass', color: 'pink', hz: to + 160, gain: 0.67, attack: 0.002, decay: decay * 0.67 },
      ]));
      return signal;
    };
    layer(ctx, sound, time, decay * 7, voice, gain);
  }
  return sound;
}

export function arcDischarge(ctx: RenderContext, density: number, sustain: boolean): Float32Array {
  const signal = new Float32Array(ctx.frames);
  const span = ctx.frames / ctx.sampleRate;
  for (let index = 0, time = 0; time < span; index++) {
    const voltage = ctx.random();
    const gain = index === 0 ? 0.85 : (0.23 + 0.65 * ctx.random()) * (sustain ? 1 : Math.exp(-time / 0.16));
    foleyGrain(ctx, signal, {
      at: time, center: 1100 + voltage * 2380, edge: 3900 + ctx.random() * 4100, duration: 0.0017 + voltage * 0.010,
      level: gain,
    });
    time += (0.007 + ctx.random() ** 1.8 * 0.104) / (0.75 + density * 0.52);
  }
  const hiss = noise(ctx.random, 'pink');
  const coil = biquad('bandpass', 588 + density * 530, 1.2, ctx.sampleRate);
  return renderSamples(ctx, (t, i) => {
    const interference = 0.73 + 0.22 * Math.sin(TAU * 53 * t + Math.sin(TAU * 11.5 * t));
    const motion = sustain ? 0.87 + 0.13 * Math.cos(TAU * 2.1 * t) : envelope(t, 0.003, 0.139);
    return signal[i] + coil(hiss() + 0.20 * Math.sin(TAU * 156 * t)) * motion * interference * 0.66;
  });
}

export function motorGesture(ctx: RenderContext, motion: 'charge' | 'vent' | 'stall' | 'tractor', strength: number): Float32Array {
  const hiss = noise(ctx.random, 'pink');
  const edge = biquad('bandpass', motion === 'vent' ? 2970 : 1130, 0.75, ctx.sampleRate);
  const speed = 0.91 + 0.18 * strength;
  const end = ctx.frames / ctx.sampleRate;
  const rotor = tone(ctx, (t) => {
    if (motion === 'charge') return (145 + 1780 * Math.min(t / (end * 0.80), 1) ** 2.37) * speed;
    if (motion === 'vent') return sweep(890, 172, 0.10, t) * speed;
    if (motion === 'stall') return sweep(430, 80, 0.151, t) * speed;
    return (215 + 101 * Math.sin(TAU * (4.8 * t + 0.45 * Math.sin(t * 7)))) * speed;
  }, (t) => {
    if (motion === 'charge') return Math.min(1, t / 0.069) * (0.38 + 0.47 * t / end) * Math.exp(-Math.max(0, t - end * 0.79) / 0.038);
    if (motion === 'vent') return envelope(t, 0.008, 0.32);
    if (motion === 'stall') return envelope(t, 0.003, 0.097) * (0.52 + 0.40 * Math.sin(TAU * 46 * t) ** 2);
    return envelope(t, 0.008, 0.36) * (0.84 + 0.16 * Math.cos(TAU * 27 * t));
  }, (p, t) => Math.sin(p + Math.sin(p * 1.979) * (0.52 + 0.61 * Math.cos(TAU * 17 * t))) * 0.70 +
    0.21 * Math.sin(p * 0.499));
  const air: Record<typeof motion, number> = { charge: 0.45, vent: 2.3, stall: 0.61, tractor: 0.57 };
  return renderSamples(ctx, (t, i) => rotor[i] + edge(hiss()) * (envelope(t, 0.0007, 0.013) * 0.57 +
    envelope(t, 0.008, motion === 'vent' ? 0.19 : 0.12) * air[motion]));
}

interface Shield {
  time: number;
  modes: readonly number[];
  decay: number;
  bend: number;
  burst: number;
}

export function shieldGesture(ctx: RenderContext, layers: readonly Shield[], edge: number): Float32Array {
  const sound = new Float32Array(ctx.frames);
  for (const spec of layers) {
    for (const [index, frequency] of spec.modes.entries()) {
      const pitch = 0.98 + ctx.random() * 0.04;
      const decay = spec.decay / (1 + index * 0.28);
      layer(ctx, sound, spec.time, decay * 6.2, part => tone(part,
        t => sweep(frequency * spec.bend * pitch, frequency * pitch, 0.035 + index * 0.004, t),
        t => envelope(t, 0.0022 + index * 0.0007, decay),
        (p, t) => Math.sin(p + Math.sin(p * 1.41) * edge * 1.5 * Math.exp(-t * 56))),
      (0.72 + 0.11 * ctx.random()) / (1 + index * 0.55));
    }
    layer(ctx, sound, spec.time, 0.09, part => punch(part, [
      { kind: 'bandpass', color: 'white', hz: 4200 + edge * 1300, gain: 1.31, attack: 0.00047, decay: 0.012 + 0.01 * edge },
      { kind: 'bandpass', color: 'pink', hz: 433, gain: 0.78, attack: 0.0022, decay: 0.022 },
    ]), spec.burst);
  }
  return reverb(sound, ctx.sampleRate, 'room', 0.15);
}
