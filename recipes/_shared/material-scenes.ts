import { biquad, clamp, envelope, layer, noise, renderSamples, TAU, tone } from '../../engine/dsp.ts';
import { renderRecording } from '../../engine/recording.ts';
import type { RecordedClip } from '../../engine/recording.ts';
import type { RenderContext, SoundRecipe } from '../../engine/types.ts';

type Material = 'soil' | 'plant' | 'cloth' | 'water' | 'wood' | 'stone' | 'iron' | 'glass' | 'air' | 'paper' | 'rubber';

// Body, edge, noisiness, and resonant length, relative to the event's center.
const materials: Record<Material, readonly [number, number, number, number]> = {
  soil: [0.55, 3.1, 0.63, 0.09], plant: [0.72, 2.35, 0.82, 0.08],
  cloth: [0.67, 2.1, 0.88, 0.045], water: [0.87, 3.6, 0.73, 0.16],
  wood: [0.73, 5.2, 0.35, 0.26], stone: [0.89, 4.1, 0.65, 0.18],
  iron: [0.83, 6.1, 0.56, 0.33], glass: [1, 3.95, 0.61, 0.34],
  air: [0.68, 2.2, 0.98, 0.06], paper: [0.65, 2.9, 0.90, 0.07],
  rubber: [0.42, 2.6, 0.49, 0.22],
};

export type SceneEvent =
  | readonly ['clip', RecordedClip, at: number, duration: number, gain: number, start: number, cutoff: number, fadeIn?: number, fadeOut?: number]
  | readonly ['contact' | 'brush', Material, at: number, duration: number, gain: number, center: number, attack: number]
  | readonly ['grains', Material, at: number, duration: number, gain: number, center: number, count: number]
  | readonly ['tone' | 'motor', at: number, duration: number, gain: number, from: number, to: number, attack: number, color: number];

function materialSound(ctx: RenderContext, material: Material, center: number, attack: number, long: boolean): Float32Array {
  const [body, edge, grit, ring] = materials[material];
  const duration = ctx.frames / ctx.sampleRate;
  const low = biquad('bandpass', center * body, long ? 0.62 : 0.84, ctx.sampleRate);
  const high = biquad('bandpass', center * edge, 0.81 + ring, ctx.sampleRate);
  const raw = noise(ctx.random, 'white');
  const roughness = 9 + 17 * ctx.random();
  return renderSamples(ctx, (time) => {
    const excitation = raw();
    const contour = envelope(time, attack, duration * (long ? 0.28 : 0.20));
    const chatter = long ? 0.67 + 0.33 * Math.sin(TAU * roughness * time + 1.3 * Math.sin(TAU * 4.3 * time)) ** 2 : 1;
    const pitch = TAU * center * (time + ring * 0.008 * (1 - Math.exp(-time * 32)));
    const resonance = (Math.sin(pitch) + 0.30 * Math.sin(pitch * (2.2 + ring))) *
      Math.exp(-time / Math.max(0.004, duration * ring));
    return contour * (low(excitation) * 0.72 + high(excitation) * grit * chatter + (1 - grit) * resonance * 0.52);
  });
}

export function scene(ctx: RenderContext, seed: number, force: number, events: readonly SceneEvent[]): Float32Array {
  const out = new Float32Array(ctx.frames);
  for (const event of events) {
    if (event[0] === 'clip') {
      const [, clip, time, duration, gain, startSec, lowpass, fadeIn = 0.006, fadeOut = 0.04] = event;
      const cutoffHz = lowpass * (0.91 + 0.18 * force);
      layer(ctx, out, time, duration, part => {
        const signal = renderRecording(part, clip, { seed, cutoffHz, startSec });
        for (let i = 0; i < signal.length; i++) {
          const ingress = fadeIn ? Math.min(1, i / (fadeIn * part.sampleRate)) : 1;
          const egress = fadeOut ? Math.min(1, (signal.length - i - 1) / (fadeOut * part.sampleRate)) : 1;
          signal[i] *= (ingress * egress) ** 1.25;
        }
        return signal;
      }, gain);
    } else if (event[0] === 'grains') {
      const [, material, time, duration, gain, center, count] = event;
      for (let i = 0; i < count; i++) {
        const phase = (i + ctx.random() * 0.68) / count;
        const at = time + phase ** 1.33 * duration * (1.12 - force * 0.20);
        const hz = center * (0.55 + ctx.random() * 0.73);
        layer(ctx, out, at, 0.014 + ctx.random() * 0.045,
          part => materialSound(part, material, hz, 0.00052, false),
          gain * (0.25 + 0.75 * ctx.random()) * Math.exp(-phase * 1.6));
      }
    } else if (event[0] === 'contact' || event[0] === 'brush') {
      const [type, material, time, duration, gain, center, attack] = event;
      const hz = center * (0.94 + ctx.random() * 0.08) * (0.93 + force * 0.14);
      layer(ctx, out, time, duration, part => materialSound(part, material, hz, attack, type === 'brush'), gain);
    } else if (event[0] === 'tone' || event[0] === 'motor') {
      const [type, time, duration, gain, from, to, attack, color] = event;
      layer(ctx, out, time, duration, part => {
        const end = type === 'motor' ? 0.13 : 0.29;
        const partLength = part.frames / part.sampleRate;
        const timbre = color * (0.78 + force * 0.38);
        return tone(part, t => from + (to - from) * clamp(t / Math.max(0.01, duration), 0, 1) ** 0.72,
          t => envelope(t, attack, duration * end) * Math.min(1, Math.max(0, (partLength - t) * 60)),
          (p, t) => Math.sin(p + timbre * Math.sin(p * 1.49)) +
            timbre * 0.34 * Math.sin(2.01 * p) * (0.77 + 0.23 * Math.cos(TAU * 17.6 * t)));
      }, gain);
    }
  }
  return out;
}

export function sceneCredits(...clips: readonly RecordedClip[]): Pick<SoundRecipe, 'recording' | 'additionalRecordings'> {
  const [recording, ...additionalRecordings] = [...new Map(clips.map(clip => [clip.credit.url, clip.credit])).values()];
  return additionalRecordings.length ? { recording, additionalRecordings } : { recording };
}

export interface Atmosphere {
  readonly body: number;
  readonly edge: number;
  readonly drift: number;
  readonly density: number;
  readonly material: Material;
  readonly texture: number;
}

export function atmosphere(ctx: RenderContext, spec: Atmosphere, activity: number): Float32Array {
  const air = noise(ctx.random, 'pink');
  const breeze = noise(ctx.random, 'brown');
  const high = biquad('bandpass', spec.edge, 0.63, ctx.sampleRate);
  const low = biquad('lowpass', spec.body, 0.72, ctx.sampleRate);
  const phase = ctx.random() * TAU;
  const sound = renderSamples(ctx, time => {
    const change = 0.68 + 0.23 * Math.sin(TAU * time * spec.drift + phase) + 0.09 * Math.sin(TAU * time * spec.drift * 2.37);
    return low(breeze()) * (0.23 + change * 0.67) + high(air()) * (0.24 + 0.21 * activity) * change;
  });
  const duration = ctx.frames / ctx.sampleRate;
  for (let time = ctx.random() / spec.density; time < duration; time += (0.42 + ctx.random() * 1.2) / spec.density) {
    const center = spec.edge * (0.22 + ctx.random() * 0.74);
    const length = 0.019 + ctx.random() * (spec.material === 'plant' ? 0.17 : 0.058);
    const volume = (ctx.random() ** 2.6 * 0.55 + 0.045) * spec.texture * (0.61 + 0.62 * activity);
    layer(ctx, sound, time, length, part => materialSound(part, spec.material, center, 0.0027, false), volume);
  }
  return sound;
}
