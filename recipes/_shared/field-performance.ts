import { biquad, clamp, layer } from '../../engine/dsp.ts';
import { renderRecording } from '../../engine/recording.ts';
import type { RecordedClip } from '../../engine/recording.ts';
import type { RenderContext } from '../../engine/types.ts';

export { sceneCredits as performanceCredits } from './material-scenes.ts';

/** Seconds are relative to the animation trigger. Each event uses a separate performance take. */
export type FieldEvent = readonly [
  source: RecordedClip, at: number, duration: number, gain: number, speed: number,
  cutoffHz: number, startSec?: number, fadeIn?: number, fadeOut?: number,
];

export interface FieldSpace {
  /** Additional path lengths in seconds. The reflections are deliberately unequal. */
  taps: readonly [number, number];
  send: number;
  dampingHz: number;
}

export function perform(ctx: RenderContext, seed: number, character: number,
  events: readonly FieldEvent[], space?: FieldSpace): Float32Array {
  const out = new Float32Array(ctx.frames);
  const counts = new Map<RecordedClip, number>();
  for (const [clip, at, seconds, gain, speed, cutoff, startSec = 0, fadeIn = 0.001, fadeOut = 0.022] of events) {
    const ordinal = counts.get(clip) ?? 0;
    counts.set(clip, ordinal + 1);
    // Step once per contact so boots, syllables and taps alternate genuine source takes.
    const take = ((seed >>> 0) + ordinal) % clip.takes.length;
    const rate = speed * (0.987 + ctx.random() * 0.026) * (0.976 + character * 0.048);
    const when = at === 0 ? 0 : at * (1.018 - 0.036 * character) + ctx.random() * Math.min(0.012, at * 0.035);
    layer(ctx, out, when, seconds, part => {
      const data = renderRecording(part, clip, {
        seed: take, speed: rate, startSec,
        cutoffHz: clamp(cutoff * (0.81 + character * 0.34), 300, part.sampleRate * 0.44),
      });
      const length = data.length;
      const attack = Math.max(1, part.sampleRate * fadeIn);
      const release = Math.max(1, part.sampleRate * fadeOut);
      for (let i = 0; i < length; i++) {
        const fraction = Math.min(1, i / attack, (length - i - 1) / release);
        data[i] *= fraction * (2 - fraction);
      }
      return data;
    }, gain * (0.97 + ctx.random() * 0.06));
  }
  if (space) {
    const damp = biquad('lowpass', space.dampingHz, 0.70, ctx.sampleRate);
    const reflected = out.map(damp);
    const [early, late] = space.taps.map(time => Math.max(1, Math.round(time * ctx.sampleRate)));
    for (let i = early; i < out.length; i++) {
      out[i] += space.send * (reflected[i - early] + (i >= late ? reflected[i - late] * 0.47 : 0));
    }
  }
  return out;
}
