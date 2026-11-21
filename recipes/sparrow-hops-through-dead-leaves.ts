import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';
import naturalSparrow from './_recordings/natural-sparrow.ts';

export default {
  id: 'sparrow-hops-through-dead-leaves', name: "Sparrow hops through dead leaves", category: 'Animals',
  tags: ["sparrow", "hop", "foliage", "chirp"],
  loopable: false, durationSec: 1.064, mixRole: 'voice', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryVineBrush, naturalSparrow),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [dryVineBrush, 0.0, 0.19, 0.18, 1, 10500, 0, 0.001, 0.022],
      [naturalSparrow, 0.12, 0.31, 0.87, 1, 10500, 0, 0.001, 0.022],
      [dryVineBrush, 0.4, 0.15, 0.12, 1, 10500, 0, 0.001, 0.022],
      [naturalSparrow, 0.694, 0.32, 0.66, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
