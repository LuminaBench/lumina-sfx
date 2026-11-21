import { envelope, formants, mix, modal, noise, punch, renderSamples, sweep, TAU, tone, waveshape } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

interface Vocal {
  pitch: number;
  drift: number;
  length: number;
  attack: number;
  anger: number;
  rot: number;
  vowel: number;
}

export function undeadVoice(ctx: RenderContext, design: Vocal): Float32Array {
  const { pitch, drift, length, attack, anger, rot, vowel } = design;
  const grain = noise(ctx.random, 'pink');
  const breath = noise(ctx.random, 'white');
  const movement = ctx.random() * TAU;
  const contour = (t: number) => envelope(t, attack, length * 0.32) *
    (1 + (0.17 + 0.2 * rot) * Math.sin(TAU * (19 - 9 * rot) * t + movement)) *
    (1 / (1 + Math.exp((t - length) * 39)));
  const voiced = tone(ctx,
    (t) => sweep(pitch + drift, pitch, length * 0.65, t) *
      (1 + 0.05 * Math.sin(TAU * 4.2 * t + movement) + rot * 0.035 * Math.sin(TAU * 29 * t)),
    () => 1,
    (phase) => (0.48 * Math.sin(phase / 2) + 0.59 * Math.sin(phase) +
      0.25 * Math.sin(phase * 2) + 0.14 * Math.sin(phase * 3)) *
      (0.79 + 0.21 * Math.sin(phase + movement)));
  const excitation = renderSamples(ctx,
    (t, i) => waveshape(voiced[i] * 0.64 + grain() * (0.18 + rot * 0.68) + breath() * 0.13, 2.4 + anger * 3) * contour(t));
  const open = formants(excitation, ctx.sampleRate, [
    { hz: 475 + anger * 359, bandwidth: 118, gain: 1.72 },
    { hz: 1040 + vowel * 460, bandwidth: 160, gain: 1.05 },
    { hz: 2440, bandwidth: 240, gain: 0.45 },
  ]);
  const closed = formants(excitation, ctx.sampleRate, [
    { hz: 282, bandwidth: 112, gain: 1.58 }, { hz: 756, bandwidth: 112, gain: 1.06 },
    { hz: 1890, bandwidth: 215, gain: 0.4 },
  ]);
  return renderSamples(ctx, (t, i) => {
    const mouth = 0.15 + 0.82 * Math.sin(Math.PI * Math.min(1, t / length)) ** 1.4;
    return open[i] * mouth + closed[i] * (1 - mouth) + voiced[i] * contour(t) * 0.14;
  });
}

export function bodyImpact(ctx: RenderContext, pitch: number, decay: number, wetness: number): Float32Array {
  const sound = punch(ctx, [
    { color: 'brown', kind: 'lowpass', hz: 245, gain: 0.84, attack: 0.001, decay },
    { color: 'pink', kind: 'bandpass', hz: 670, gain: 1.01, attack: 0.0004, decay: 0.032 },
    { color: 'white', kind: 'bandpass', hz: 1530, q: 0.74, gain: 0.45 + wetness, attack: 0.0015, decay: 0.024 + wetness * 0.027 },
  ]);
  mix(sound, modal(ctx, 'flesh', pitch, decay), 0.69);
  mix(sound, tone(ctx, (t) => sweep(pitch * 2.1, pitch * 0.62, 0.021, t),
    (t) => envelope(t, 0.0018, decay * 0.55)), 0.71);
  return sound;
}
