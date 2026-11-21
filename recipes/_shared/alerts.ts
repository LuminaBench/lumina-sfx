import { biquad, envelope, layer, mix, noise, renderSamples, sweep, TAU, tone } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

type Event = readonly [at: number, pitch: number, length: number, gain: number];
type Color = 'bell' | 'soft' | 'clean' | 'alarm';

export function beeps(ctx: RenderContext, notes: readonly Event[], edge: number, color: Color): Float32Array {
  const out = new Float32Array(ctx.frames);
  const second = color === 'alarm' ? 0.36 + edge * 0.26 : color === 'soft' ? 0.12 + edge * 0.16 : 0.09 + edge * 0.17;
  for (const [at, hz, duration, gain] of notes) {
    layer(ctx, out, at, duration + 0.17, (note) => {
      const attack = color === 'soft' ? 0.008 : 0.0026;
      const tail = color === 'bell' || color === 'soft' ? 0.039 + 0.029 * edge : 0.014;
      const gate = (t: number) => Math.min(1, t / attack) * Math.exp(-Math.max(0, t - duration) / tail);
      const pitch = (t: number) => color === 'alarm' ? sweep(hz * 1.12, hz, 0.016, t) : hz;
      const sound = tone(note, pitch, gate, (phase, t) => {
        const trill = color === 'bell' ? 0.76 + 0.24 * Math.cos(TAU * 27 * t) : 1;
        const upper = color === 'alarm' ? Math.sin(phase * 3) : Math.sin(phase * 2);
        return (Math.sin(phase) + second * upper + (color === 'alarm' ? 0.11 : 0.045) * Math.sin(phase * 5)) * trill;
      });
      if (color === 'bell') {
        mix(sound, tone(note, () => hz * 1.49, (t) => envelope(t, 0.0014, 0.039 + edge * 0.041)), 0.58);
        mix(sound, tone(note, () => hz * 2.41, (t) => envelope(t, 0.0016, 0.022 + edge * 0.034)), 0.27);
      }
      return sound;
    }, gain);
  }
  return out;
}

export function siren(ctx: RenderContext, period: number, oscillations: number, low: number, high: number, edge: number): Float32Array {
  const harmonic = (t: number) => {
    const angle = TAU * oscillations * t / period + 0.34;
    return (0.5 - 0.5 * Math.cos(angle)) ** (0.92 + 0.69 * edge);
  };
  const source = tone(ctx, (t) => low + (high - low) * harmonic(t),
    (t) => 0.69 + 0.24 * harmonic(t),
    (p) => Math.sin(p) + (0.20 + edge * 0.26) * Math.sin(2 * p) +
      (0.065 + edge * 0.20) * Math.sin(3 * p) + 0.045 * edge * Math.sin(5 * p));
  const lowpass = biquad('lowpass', 1550 + edge * 3590, 0.71, ctx.sampleRate);
  return source.map(lowpass);
}

export function vibration(ctx: RenderContext, weight: number): Float32Array {
  const out = new Float32Array(ctx.frames);
  for (const [ms, gain] of [[0, 1], [322, 0.85]]) {
    layer(ctx, out, ms / 1000, 0.37, (motor) => {
      const rattle = noise(motor.random, 'pink');
      const wood = biquad('bandpass', 330, 1.20, motor.sampleRate);
      const ramp = (t: number) => Math.min(1, t / 0.024) * Math.exp(-Math.max(0, t - 0.172) / 0.026);
      const buzz = tone(motor, (t) => sweep(88 + weight * 35, 144 + weight * 54, 0.042, t), ramp,
        (p) => Math.sin(p) + 0.41 * Math.sin(p * 2) + 0.22 * Math.sin(p * 3) + 0.09 * Math.sin(p * 7));
      return renderSamples(motor, (t, i) => buzz[i] * 0.87 + wood(rattle()) * ramp(t) * (0.42 + 0.3 * weight));
    }, gain);
  }
  return out;
}
