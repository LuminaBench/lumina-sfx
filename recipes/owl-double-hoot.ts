import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalOwl from './_recordings/natural-owl.ts';
import naturalOwlAnswer from './_recordings/natural-owl-answer.ts';

export default {
  id: 'owl-double-hoot', name: "Owl Double Hoot", category: 'Animals',
  tags: ["bird", "owl", "hoot", "night"],
  loopable: false, durationSec: 1.85, mixRole: 'voice', targetRmsDbfs: -23,
  params: { depth: { label: 'Depth', min: 0, max: 1, default: 0.64 } },
  ...performanceCredits(naturalOwl, naturalOwlAnswer),
  render(ctx, { seed, params }) {
    const speed = 1.12 - 0.24 * params.depth;
    return perform(ctx, seed, params.depth, [
      [naturalOwl, 0.0, 0.76, 0.91, speed, 10500, 0, 0.001, 0.022],
      [naturalOwlAnswer, 0.79, 1.06, 0.93, speed * 1.03, 5600.0, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
