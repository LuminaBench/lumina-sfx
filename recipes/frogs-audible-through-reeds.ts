import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';
import marshFrogsNightLoop from './_recordings/marsh-frogs-night-loop.ts';

export default {
  id: 'frogs-audible-through-reeds', name: "Frogs audible through reeds", category: 'Animals',
  tags: ["frog", "frogs", "marsh", "reeds"],
  loopable: false, durationSec: 3.02, mixRole: 'voice', targetRmsDbfs: -29,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(dryVineBrush, marshFrogsNightLoop),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [dryVineBrush, 0.0, 0.32, 0.23, 1, 10500, 0, 0.001, 0.022],
      [marshFrogsNightLoop, 0.16, 2.81, 0.83, 1.0, 6200.0, 4.0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
