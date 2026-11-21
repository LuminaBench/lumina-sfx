import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGroan from './_recordings/natural-groan.ts';
import urgentDoorKnock from './_recordings/urgent-door-knock.ts';
import naturalGrowl from './_recordings/natural-growl.ts';

export default {
  id: 'blocked-doorway-angry-moan', name: "Blocked doorway angry moan", category: 'Zombies & Combat',
  tags: ["creature", "zombie", "frustration", "door"],
  loopable: false, durationSec: 2.017, mixRole: 'voice', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGroan, urgentDoorKnock, naturalGrowl),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGroan, 0.0, 1.29, 0.86, 0.98, 8100.0, 0, 0.001, 0.022],
      [urgentDoorKnock, 0.64, 0.28, 0.19, 1, 10500, 0, 0.001, 0.022],
      [naturalGrowl, 1.19, 0.69, 0.88, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
