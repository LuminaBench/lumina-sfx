import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/chicken-clucks.ts';

export default {
  id: "chicken-clucks", name: "Chicken Clucks", category: 'Animals',
  tags: ["bird","chicken","hen","cluck","farm"], loopable: false, durationSec: 1.04,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.62 } },
  mixRole: 'voice', targetRmsDbfs: -22,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    // Divide each take at a quiet gap, preserving the hen's pitch and syllable shapes.
    const cut = Math.round(ctx.sampleRate * (seed % recording.takes.length === 0 ? 0.46 : 0.39));
    const pause = Math.round(ctx.sampleRate * (1 - params.pace) * 0.19);
    const take = renderRecording(ctx, recording, { seed, cutoffHz: 9400 });
    if (!pause) return take;
    const out = new Float32Array(ctx.frames);
    out.set(take.subarray(0, cut));
    out.set(take.subarray(cut, ctx.frames - pause), cut + pause);
    const ramp = Math.round(ctx.sampleRate * 0.004);
    for (let i = 0; i < ramp; i++) {
      out[cut - 1 - i] *= i / ramp;
      out[cut + pause + i] *= i / ramp;
    }
    return out;
  },
} satisfies SoundRecipe;
