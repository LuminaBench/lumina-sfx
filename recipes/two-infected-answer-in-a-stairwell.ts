import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGroan from './_recordings/natural-groan.ts';
import naturalGrowl from './_recordings/natural-growl.ts';

export default {
  id: 'two-infected-answer-in-a-stairwell', name: "Two infected answer in a stairwell", category: 'Zombies & Combat',
  tags: ["zombie", "creature", "groan", "chorus", "echo"],
  loopable: false, durationSec: 3.187, mixRole: 'voice', targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGroan, naturalGrowl),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGroan, 0.0, 1.39, 0.88, 1, 10500, 0, 0.001, 0.022],
      [naturalGrowl, 1.06, 0.79, 0.48, 0.96, 4400.0, 0, 0.001, 0.022],
      [naturalGroan, 1.83, 1.22, 0.63, 1.02, 5550.0, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
