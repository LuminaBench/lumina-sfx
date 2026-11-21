import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldLeafBed from './_recordings/field-leaf-bed.ts';
import naturalSparrow from './_recordings/natural-sparrow.ts';

export default {
  id: 'sparrows-in-a-garden-hedge-loop', name: "Sparrows in a garden hedge loop", category: 'Animals',
  tags: ["sparrow", "chirps", "garden", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -29,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldLeafBed, naturalSparrow),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldLeafBed, 0, 5.0, 0.2, 1, 6000, 4.0, 0.001, 0.015],
      [naturalSparrow, 0.14, 0.32, 0.78, 1, 10500, 0, 0.001, 0.022],
      [naturalSparrow, 0.96, 0.3, 0.51, 1, 10500, 0, 0.001, 0.022],
      [naturalSparrow, 2.19, 0.31, 0.63, 1, 10500, 0, 0.001, 0.022],
      [naturalSparrow, 3.49, 0.31, 0.48, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
