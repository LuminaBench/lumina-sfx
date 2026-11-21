import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalLion from './_recordings/natural-lion.ts';

export default {
  id: 'two-lions-call-across-an-enclosure', name: "Two lions call across an enclosure", category: 'Animals',
  tags: ["lion", "pair", "roar", "response"],
  loopable: false, durationSec: 3.037, mixRole: 'voice', targetRmsDbfs: -23,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalLion),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalLion, 0.0, 1.69, 0.99, 1, 10500, 0, 0.001, 0.022],
      [naturalLion, 1.42, 1.48, 0.59, 0.984, 4400.0, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
