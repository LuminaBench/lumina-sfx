import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalDogbreath from './_recordings/natural-dogbreath.ts';

export default {
  id: 'dog-noses-a-pocket', name: "Dog noses a pocket", category: 'Animals',
  tags: ["dog", "sniff", "clothing", "search"],
  loopable: false, durationSec: 1.15, mixRole: 'voice', targetRmsDbfs: -29,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, naturalDogbreath),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [jacketMovementRustle, 0.0, 0.26, 0.18, 1, 10500, 0, 0.001, 0.022],
      [naturalDogbreath, 0.13, 0.97, 1.0, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.78, 0.18, 0.13, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
