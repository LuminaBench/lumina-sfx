import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import wetCropBrush from './_recordings/wet-crop-brush.ts';
import naturalGrowl from './_recordings/natural-growl.ts';
import naturalGroan from './_recordings/natural-groan.ts';

export default {
  id: 'angry-creature-recoils-from-contact', name: "Angry creature recoils from contact", category: 'Zombies & Combat',
  tags: ["creature", "snarl", "hit", "reaction"],
  loopable: false, durationSec: 1.4, mixRole: 'voice', targetRmsDbfs: -22,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(wetCropBrush, naturalGrowl, naturalGroan),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [wetCropBrush, 0.0, 0.19, 0.66, 1, 10500, 0, 0.001, 0.022],
      [naturalGrowl, 0.049, 0.65, 1.0, 1, 10500, 0, 0.001, 0.022],
      [naturalGroan, 0.61, 0.74, 0.67, 1.08, 5200.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
