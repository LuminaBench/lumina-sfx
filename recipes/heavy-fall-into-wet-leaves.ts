import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import wetCropBrush from './_recordings/wet-crop-brush.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'heavy-fall-into-wet-leaves', name: "Heavy fall into wet leaves", category: 'Combat Foley',
  tags: ["body", "fall", "wet", "leaves", "impact"],
  loopable: false, durationSec: 0.808, mixRole: 'impact', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, twoFootLanding, wetCropBrush, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [jacketMovementRustle, 0.0, 0.19, 0.25, 1, 10500, 0, 0.001, 0.022],
      [twoFootLanding, 0.081, 0.24, 1.0, 1, 10500, 0, 0.001, 0.022],
      [wetCropBrush, 0.115, 0.38, 0.55, 1, 10500, 0, 0.001, 0.022],
      [dryVineBrush, 0.187, 0.43, 0.43, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
