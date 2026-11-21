import type { SoundRecipe } from '../engine/types.ts';
import { calls } from './_shared/animals.ts';

export default {
  id: "duck-quacks", name: "Duck Quacks", category: 'Animals',
  tags: ["bird","duck","quack","pond"], loopable: false, durationSec: 1,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.61 } },
  targetRmsDbfs: -22,
  render(ctx, { params }) {
    const time = 1.18 - params.pace * 0.33;
    return calls(ctx, [[0, 375, 563, 297, 0.164, 1, 0.83], [0.211 * time, 351, 499, 248, 0.142, 0.86, 0.72], [0.415 * time, 316, 463, 221, 0.16, 0.70, 0.76]], { formants: [730, 1420, 2580], grit: 0.45, air: 0.38, wobble: 0.49 });
  },
} satisfies SoundRecipe;
