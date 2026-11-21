import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import wetCropBrush from './_recordings/wet-crop-brush.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';
import naturalGroan from './_recordings/natural-groan.ts';

export default {
  id: 'crawler-pulls-across-wet-tile', name: "Crawler pulls across wet tile", category: 'Zombies & Combat',
  tags: ["zombie", "crawl", "drag", "flesh"],
  loopable: false, durationSec: 1.722, mixRole: 'voice', targetRmsDbfs: -26,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(wetCropBrush, naturalGravelDrag, naturalGroan),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [wetCropBrush, 0.0, 0.36, 0.67, 1, 10500, 0, 0.001, 0.022],
      [naturalGravelDrag, 0.2, 0.31, 0.17, 1, 10500, 0, 0.001, 0.022],
      [naturalGroan, 0.39, 1.11, 0.67, 1, 10500, 0, 0.001, 0.022],
      [wetCropBrush, 1.29, 0.35, 0.58, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
