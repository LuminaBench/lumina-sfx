import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';
import naturalGroan from './_recordings/natural-groan.ts';
import naturalConcrete from './_recordings/natural-concrete.ts';

export default {
  id: 'crouched-creature-rises-from-rubble', name: "Crouched creature rises from rubble", category: 'Zombies & Combat',
  tags: ["creature", "zombie", "scrape", "snarl"],
  loopable: false, durationSec: 1.452, mixRole: 'voice', targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGravelDrag, naturalGroan, naturalConcrete),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGravelDrag, 0.0, 0.45, 0.38, 1, 10500, 0, 0.001, 0.022],
      [naturalGroan, 0.19, 1.18, 0.88, 1, 10500, 0, 0.001, 0.022],
      [naturalConcrete, 0.75, 0.31, 0.23, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
