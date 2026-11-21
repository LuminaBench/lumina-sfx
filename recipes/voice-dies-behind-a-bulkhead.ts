import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGroan from './_recordings/natural-groan.ts';
import roomDoorSlam from './_recordings/room-door-slam.ts';
import naturalGrowl from './_recordings/natural-growl.ts';

export default {
  id: 'voice-dies-behind-a-bulkhead', name: "Voice dies behind a bulkhead", category: 'Zombies & Combat',
  tags: ["zombie", "voice", "door", "slam", "muffled"],
  loopable: false, durationSec: 1.902, mixRole: 'voice', targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGroan, roomDoorSlam, naturalGrowl),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGroan, 0.0, 1.09, 0.92, 1, 10500, 0, 0.001, 0.022],
      [roomDoorSlam, 0.86, 0.54, 0.62, 1, 10500, 0, 0.001, 0.022],
      [naturalGrowl, 1.19, 0.63, 0.21, 0.99, 1850.0, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
