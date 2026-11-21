import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPant from './_recordings/natural-pant.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import naturalDogbreath from './_recordings/natural-dogbreath.ts';

export default {
  id: 'dog-catches-breath-by-the-gate', name: "Dog catches breath by the gate", category: 'Animals',
  tags: ["dog", "panting", "breath", "fence"],
  loopable: false, durationSec: 2.642, mixRole: 'voice', targetRmsDbfs: -26,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPant, leatherStrapFlex, naturalDogbreath),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalPant, 0.0, 1.71, 0.92, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.62, 0.25, 0.1, 1, 10500, 0, 0.001, 0.022],
      [naturalDogbreath, 1.74, 0.75, 0.62, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
