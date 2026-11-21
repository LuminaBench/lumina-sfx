import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalCathiss from './_recordings/natural-cathiss.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import naturalPlanks from './_recordings/natural-planks.ts';

export default {
  id: 'cat-hisses-and-springs-away', name: "Cat hisses and springs away", category: 'Animals',
  tags: ["cat", "hiss", "startled", "paws"],
  loopable: false, durationSec: 0.58, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalCathiss, jacketMovementRustle, naturalPlanks),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalCathiss, 0.0, 0.52, 1.0, 1, 10500, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.22, 0.17, 0.19, 1, 10500, 0, 0.001, 0.022],
      [naturalPlanks, 0.34, 0.11, 0.18, 1.3, 5000.0, 0, 0.001, 0.022],
      [naturalPlanks, 0.43, 0.1, 0.13, 1.28, 4100.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
