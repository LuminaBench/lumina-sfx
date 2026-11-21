import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import urgentDoorKnock from './_recordings/urgent-door-knock.ts';
import naturalGrowl from './_recordings/natural-growl.ts';
import woodenChestLatchRelease from './_recordings/wooden-chest-latch-release.ts';

export default {
  id: 'infected-claws-at-a-locked-door', name: "Infected claws at a locked door", category: 'Zombies & Combat',
  tags: ["zombie", "scratching", "rattling", "door"],
  loopable: false, durationSec: 1.347, mixRole: 'voice', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(urgentDoorKnock, naturalGrowl, woodenChestLatchRelease),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [urgentDoorKnock, 0.0, 0.39, 0.68, 1, 10500, 0, 0.001, 0.022],
      [naturalGrowl, 0.1, 0.72, 0.88, 1, 10500, 0, 0.001, 0.022],
      [woodenChestLatchRelease, 0.71, 0.32, 0.57, 1, 10500, 0, 0.001, 0.022],
      [urgentDoorKnock, 0.88, 0.33, 0.63, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
