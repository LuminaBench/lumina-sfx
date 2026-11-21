import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import wetCropBrush from './_recordings/wet-crop-brush.ts';

export default {
  id: 'dull-torso-hit-followed-by-cloth', name: "Dull torso hit followed by cloth", category: 'Zombies & Combat',
  tags: ["body", "torso", "melee", "thump", "cloth"],
  loopable: false, durationSec: 0.399, mixRole: 'impact', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(twoFootLanding, jacketMovementRustle, wetCropBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [twoFootLanding, 0.0, 0.2, 1.0, 0.91, 3950.0, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.029, 0.32, 0.48, 1, 10500, 0, 0.001, 0.022],
      [wetCropBrush, 0.046, 0.15, 0.14, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
