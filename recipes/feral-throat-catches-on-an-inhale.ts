import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGroan from './_recordings/natural-groan.ts';
import naturalGrowl from './_recordings/natural-growl.ts';

export default {
  id: 'feral-throat-catches-on-an-inhale', name: "Feral throat catches on an inhale", category: 'Zombies & Combat',
  tags: ["creature", "zombie", "rasp", "inhalation", "close"],
  loopable: false, durationSec: 1.26, mixRole: 'voice', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGroan, naturalGrowl),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGroan, 0.0, 0.94, 0.95, 0.93, 8500.0, 0, 0.001, 0.022],
      [naturalGrowl, 0.8, 0.41, 0.61, 1.02, 6750.0, 0.07, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
