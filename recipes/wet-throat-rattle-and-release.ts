import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrowl from './_recordings/natural-growl.ts';
import wetCropBrush from './_recordings/wet-crop-brush.ts';
import naturalGroan from './_recordings/natural-groan.ts';

export default {
  id: 'wet-throat-rattle-and-release', name: "Wet throat rattle and release", category: 'Zombies & Combat',
  tags: ["zombie", "creature", "guttural", "mouth"],
  loopable: false, durationSec: 1.7, mixRole: 'voice', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrowl, wetCropBrush, naturalGroan),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGrowl, 0.0, 0.66, 0.97, 1, 10500, 0, 0.001, 0.022],
      [wetCropBrush, 0.11, 0.2, 0.1, 1, 10500, 0, 0.001, 0.022],
      [naturalGroan, 0.6, 1.05, 0.74, 0.89, 6650.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
