import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldNightCrickets from './_recordings/field-night-crickets.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'crickets-beneath-a-half-open-window-loop', name: "Crickets beneath a half open window loop", category: 'Animals',
  tags: ["crickets", "insect", "night", "interior", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -31,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldNightCrickets, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldNightCrickets, 0, 5.0, 0.75, 1, 6400, 1.2, 0.001, 0.015],
      [dryVineBrush, 1.21, 0.34, 0.052, 1, 10500, 0, 0.001, 0.022],
      [fieldNightCrickets, 2.02, 1.98, 0.19, 1.03, 8900.0, 8.0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
