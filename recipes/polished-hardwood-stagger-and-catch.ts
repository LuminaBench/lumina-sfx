import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';

export default {
  id: 'polished-hardwood-stagger-and-catch', name: "Polished hardwood stagger and catch", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "stumble", "recovery", "trip"],
  loopable: false, durationSec: 0.848, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(hardwoodFootstep, jacketMovementRustle, woodPlatformLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [hardwoodFootstep, 0, 0.2222, 0.67, 1.08, 9600, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.146, 0.2526, 0.84, 0.95, 9600, 0, 0.001, 0.022],
      [jacketMovementRustle, 0.229, 0.21, 0.19, 1.04, 5700, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.406, 0.2637, 1, 0.91, 9600, 0, 0.001, 0.022],
      [woodPlatformLanding, 0.536, 0.23, 0.18, 1.02, 5400, 0, 0.001, 0.045],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
