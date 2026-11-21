import { biquad, clamp, formants, layer, mix, noise, renderSamples, TAU } from '../../engine/dsp.ts';
import type { RenderContext } from '../../engine/types.ts';

type Note = readonly [at: number, pitch: number, crest: number, release: number, seconds: number, level: number, bend: number];

function arc(t: number, centre: number, from: number, crest: number, out: number): number {
  const rise = t < centre;
  const position = rise ? t / centre : (t - centre) / (1 - centre);
  const smooth = position * position * (3 - 2 * position);
  return rise ? from + (crest - from) * smooth : crest + (out - crest) * smooth;
}

function contour(t: number, length: number, attack: number): number {
  const on = Math.min(1, t / attack);
  const release = Math.min(1, Math.max(0, (length - t) / (length * 0.37)));
  return on * on * release ** 1.42;
}

export function birds(ctx: RenderContext, notes: readonly Note[], pace: number): Float32Array {
  const sound = new Float32Array(ctx.frames);
  const scale = 0.95 + 0.11 * ctx.random();
  for (const [at, from, crest, release, seconds, level, bend] of notes) {
    const length = seconds * (0.94 + 0.105 * ctx.random());
    const peak = 0.19 + 0.22 * ctx.random();
    layer(ctx, sound, at * pace, length, (note) => {
      const white = noise(note.random, 'white');
      const air = biquad('bandpass', crest * 1.08, 1.26, note.sampleRate);
      const fluctuation = biquad('bandpass', 83, 0.63, note.sampleRate);
      let phase = 0;
      return renderSamples(note, (t) => {
        const pos = Math.min(1, t / length);
        const hiss = white();
        const motion = clamp(fluctuation(hiss) * 0.8, -0.10, 0.10);
        const f0 = arc(pos, peak, from, crest, release) * scale * (1 + bend * motion);
        phase += TAU * clamp(f0, 0.0, note.sampleRate * 0.45) / note.sampleRate;
        const multiple = f0 < note.sampleRate * 0.23 ? Math.sin(2 * phase) : 0;
        return contour(t, length, Math.min(0.011, length * 0.24)) *
          ((0.99 - bend * 0.19) * Math.sin(phase) + (0.08 + bend * 0.13) * multiple +
            air(hiss) * (0.10 + bend * 0.44));
      });
    }, level);
  }
  return sound;
}

interface Animal {
  formants: readonly [first: number, second: number, third: number];
  grit: number;
  air: number;
  wobble: number;
}

export function calls(ctx: RenderContext, notes: readonly Note[], voice: Animal): Float32Array {
  const out = new Float32Array(ctx.frames);
  const colour = 0.93 + 0.14 * ctx.random();
  for (const [at, from, crest, release, seconds, level, bend] of notes) {
    const length = seconds * (0.93 + 0.113 * ctx.random());
    const opening = 0.18 + 0.24 * ctx.random();
    layer(ctx, out, at, length + 0.04, (note) => {
      const breeze = noise(note.random, 'white');
      const breath = biquad('bandpass', voice.formants[1] * 1.12, 0.87, note.sampleRate);
      const tremor = biquad('bandpass', 9.8 + bend * 17.5, 0.80, note.sampleRate);
      let phase = 0;
      const source = renderSamples(note, (t) => {
        const x = Math.min(1, t / length);
        const air = breeze();
        const wobble = clamp(tremor(air) * 7.6, -0.22, 0.24);
        const swing = 1 + voice.wobble * (wobble + 0.044 * Math.sin(TAU * (7.3 + bend * 6) * t));
        phase += TAU * arc(x, opening, from, crest, release) * colour * swing / note.sampleRate;
        const primary = Math.sin(phase);
        const rough = Math.sin(phase * 0.5) * voice.grit * 0.27;
        const edge = Math.sin(phase * 2) * (0.17 + 0.36 * voice.grit) + Math.sin(phase * 3) * voice.grit * 0.15;
        const open = contour(t, length, Math.min(0.016, length * 0.19));
        return open * (Math.tanh((primary + edge + rough) * (1.22 + voice.grit * 1.61)) *
          (0.88 + wobble * voice.wobble * 0.82) + breath(air) * voice.air * (0.28 + 0.65 * bend));
      });
      const vowels = formants(source, note.sampleRate, [
        { hz: voice.formants[0] * colour, bandwidth: 215, gain: 1.0 },
        { hz: voice.formants[1] * colour, bandwidth: 355, gain: 0.58 },
        { hz: voice.formants[2] * colour, bandwidth: 560, gain: voice.air * 0.45 },
      ]);
      mix(vowels, source, 0.30 * (1 - voice.grit * 0.34));
      return vowels;
    }, level);
  }
  return out;
}
