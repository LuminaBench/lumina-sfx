import { biquad, envelope, layer, mix, noise, punch, renderSamples, reverb, sweep, TAU, tone } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';
import { foleyGrain } from './foley.ts';

interface Rune {
  at: number;
  hz: number;
  hold: number;
  level: number;
}

export function runeChime(ctx: RenderContext, notes: readonly Rune[], bloom: number, color: 'glass' | 'wood' | 'air'): Float32Array {
  const sound = new Float32Array(ctx.frames);
  const shapes = {
    glass: [1, 2.19, 3.64, 5.13], wood: [1, 2.69, 4.77], air: [1, 1.99, 3.01, 4.02],
  };
  for (const note of notes) {
    for (const [index, ratio] of shapes[color].entries()) {
      const width = note.hold / (1 + index * 0.62);
      const amplitude = note.level / (1 + index * (color === 'air' ? 1.9 : 2.3) / (0.50 + bloom));
      const pitch = note.hz * ratio * (0.997 + ctx.random() * 0.006);
      layer(ctx, sound, note.at + index * 0.00035, width * 6, part => tone(part,
        (t) => sweep(pitch * (1.016 + index * 0.003), pitch, 0.011, t),
        t => envelope(t, 0.0018 + (color === 'air' ? index * 0.0093 : 0), width),
        (p, t) => Math.sin(p + 0.10 * Math.cos(TAU * (6 + index * 2) * t))), amplitude);
    }
    foleyGrain(ctx, sound, {
      at: note.at, center: note.hz * 1.93, edge: note.hz * 4.13, duration: 0.009 + bloom * 0.011,
      level: note.level * (color === 'wood' ? 0.67 : 0.15),
    });
  }
  return reverb(sound, ctx.sampleRate, color === 'air' ? 'outdoor' : 'room', 0.08 + bloom * 0.14);
}

interface Passage {
  at: number;
  from: number;
  to: number;
  attack: number;
  decay: number;
  wind: number;
  level: number;
}

export function magicPassage(ctx: RenderContext, gestures: readonly Passage[], shimmer: number): Float32Array {
  const sound = new Float32Array(ctx.frames);
  for (const spec of gestures) {
    const duration = spec.attack + spec.decay * 5;
    layer(ctx, sound, spec.at, duration, (part) => {
      const air = noise(part.random, 'pink');
      const edge = biquad('bandpass', 1340 + spec.wind * 1950, 0.76, ctx.sampleRate);
      const wobble = 0.75 + shimmer * 0.5;
      const shape = (t: number) => envelope(t, spec.attack, spec.decay);
      const halo = tone(part, t => sweep(spec.from, spec.to, spec.attack * 0.96 + 0.018, t), shape, (p, t) =>
        Math.sin(p + 0.53 * Math.sin(p * 0.501 + Math.sin(TAU * 17.1 * t))) +
        0.24 * wobble * Math.sin(p * 1.484 - 0.6 * Math.cos(TAU * 19.3 * t)));
      return renderSamples(part, (t, i) => halo[i] * (0.78 + 0.22 * Math.sin(TAU * 13.7 * t) ** 2) +
        (0.36 + spec.wind * 0.77) * edge(air()) * shape(t));
    }, spec.level);
  }
  mix(sound, punch(ctx, [
    { kind: 'bandpass', color: 'white', hz: 1850, gain: 0.54, attack: 0.00025, decay: 0.013 },
  ]));
  return reverb(sound, ctx.sampleRate, 'outdoor', 0.16 + shimmer * 0.07);
}

export function potionFizz(ctx: RenderContext, activity: number): Float32Array {
  const air = noise(ctx.random, 'white');
  const heat = biquad('bandpass', 2370, 0.78, ctx.sampleRate);
  const sound = renderSamples(ctx, (t) => heat(air()) * envelope(t, 0.004, 0.18) * 0.25);
  const count = Math.round(13 + 15 * activity);
  for (let i = 0; i < count; i++) {
    const fraction = i / count;
    const pitch = 135 + 870 * ctx.random() ** 2.4;
    const decay = 0.0055 + 0.016 * ctx.random();
    const at = fraction * (0.43 + 0.21 * ctx.random());
    layer(ctx, sound, at, decay * 7, part => tone(part, t => sweep(pitch * 0.70, pitch * 1.49, decay * 0.43, t),
      t => envelope(t, 0.0016, decay), p => Math.sin(p) + 0.30 * Math.sin(p * 2.05)),
    (0.18 + 0.41 * ctx.random()) * Math.exp(-fraction * 2.7));
  }
  return sound;
}
