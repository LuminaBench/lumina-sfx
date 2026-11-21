import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalDuck from './_recordings/natural-duck.ts';

export default {
  id: 'duck-answers-across-a-pool', name: "Duck answers across a pool", category: 'Animals',
  tags: ["duck", "mallard", "pond", "answering"],
  loopable: false, durationSec: 1.622, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalDuck),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalDuck, 0.0, 0.64, 0.92, 1, 10500, 0, 0.001, 0.022],
      [naturalDuck, 0.86, 0.61, 0.45, 0.97, 4600.0, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
