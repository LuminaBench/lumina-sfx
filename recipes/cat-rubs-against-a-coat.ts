import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalPurr from './_recordings/natural-purr.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'cat-rubs-against-a-coat', name: "Cat rubs against a coat", category: 'Animals',
  tags: ["cat", "purr", "fabric", "pet"],
  loopable: false, durationSec: 2.1, mixRole: 'voice', targetRmsDbfs: -30,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalPurr, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalPurr, 0.0, 2.05, 1.0, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.25, 0.22, 0.1, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 1.38, 0.25, 0.14, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
