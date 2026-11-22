import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import fieldPepperRip from './_recordings/field-pepper-rip.ts';

export default {
  id: 'raincoat-sleeve-takes-a-body-blow', name: "Raincoat sleeve takes a body blow", category: 'Combat Foley',
  tags: ["flesh", "impact", "padded", "coat", "combat"],
  loopable: false, durationSec: 0.283, mixRole: 'impact', targetRmsDbfs: -22,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, twoFootLanding, fieldPepperRip),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [jacketMovementRustle, 0.0, 0.23, 0.48, 1, 10500, 0, 0.001, 0.022],
      [twoFootLanding, 0.023, 0.21, 1.0, 1, 10500, 0, 0.001, 0.022],
      [fieldPepperRip, 0.043, 0.19, 0.34, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
