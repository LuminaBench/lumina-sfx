import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalBear from './_recordings/natural-bear.ts';
import shakeSoilOffRoots from './_recordings/shake-soil-off-roots.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'grizzly-shifts-while-feeding', name: "Grizzly shifts while feeding", category: 'Animals',
  tags: ["bear", "grizzly", "feeding", "jaw"],
  loopable: false, durationSec: 2.83, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalBear, shakeSoilOffRoots, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalBear, 0.0, 2.78, 1.0, 1, 10500, 0, 0.001, 0.022],
      [shakeSoilOffRoots, 0.51, 0.21, 0.11, 1, 10500, 0, 0.001, 0.022],
      [dryVineBrush, 1.44, 0.24, 0.13, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
