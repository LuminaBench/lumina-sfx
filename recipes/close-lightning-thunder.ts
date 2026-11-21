import { layer, mix } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { pressure, rumble, scatter } from './_shared/acoustics.ts';

export default {
  id: 'close-lightning-thunder', name: 'Close Lightning & Thunder', category: 'Weather & Ambience',
  tags: ['lightning', 'thunder', 'storm', 'rumble', 'sub-bass'], loopable: false, durationSec: 8.25,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.27 } },
  spectrum: [{ band: 'sub', minShare: 0.35 }],
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    const distance = params.distance;
    const edge = 1.55 - distance * 1.18;
    const front = pressure({ ...ctx, frames: Math.round(0.095 * ctx.sampleRate) },
      { span: 0.0034, low: 805 - distance * 340, high: 3850 - distance * 2190, edge, weight: 1.15 });
    mix(sound, front, 1.48);
    scatter(ctx, sound, front, 0.64, 1.92, 3800 - distance * 2100);
    for (const [at, weight, pitch] of [[0.048, 0.67, 740], [0.125, 0.43, 500], [0.294, 0.49, 350], [0.597, 0.31, 286]]) {
      const arrival = at + 0.022 * ctx.random();
      layer(ctx, sound, arrival, 0.105, (branch) => pressure(branch, {
        span: 0.0038 + at * 0.007, low: pitch, high: pitch * 3.1,
        edge: edge * 0.73, weight: 1.42,
      }), weight);
    }
    for (const [at, cutoff, rise, decay, gain, grit] of [
      [0.021, 166, 0.024, 0.31, 4.38, 1.45],
      [0.205, 128, 0.16, 0.54, 3.10, 1.19],
      [0.67, 115, 0.33, 0.63, 2.35, 1.06],
      [1.38, 93, 0.29, 0.78, 1.61, 0.64],
      [2.06, 114, 0.48, 0.82, 1.51, 0.88],
      [3.07, 103, 0.36, 0.90, 1.39, 0.78],
      [4.10, 101, 0.48, 0.88, 1.23, 0.69],
      [5.52, 92, 0.48, 0.71, 1.05, 0.63],
    ]) {
      const time = at + at * (ctx.random() - 0.5) * 0.23;
      const duration = rise + decay * 6;
      layer(ctx, sound, time, duration, (roll) =>
        rumble(roll, cutoff * (1 - distance * 0.27), rise, decay, grit * (1 - distance * 0.36)), gain);
    }
    return sound;
  },
} satisfies SoundRecipe;
