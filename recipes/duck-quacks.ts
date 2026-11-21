import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalDuck from './_recordings/natural-duck.ts';

export default {
  id: 'duck-quacks', name: "Duck Quacks", category: 'Animals',
  tags: ["bird", "duck", "quack", "pond"],
  loopable: false, durationSec: 1, mixRole: 'voice', targetRmsDbfs: -22,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.61 } },
  ...performanceCredits(naturalDuck),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pace, [
      [naturalDuck, 0.0, 0.56, 0.99, 1, 10500, 0, 0.001, 0.022],
      [naturalDuck, 0.68 - params.pace * 0.16, 0.4, 0.79, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
