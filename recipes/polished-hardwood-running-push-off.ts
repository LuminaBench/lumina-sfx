import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'polished-hardwood-running-push-off', name: "Polished hardwood running push off", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "jump", "takeoff", "toe", "burst"],
  loopable: false, durationSec: 0.383, mixRole: 'foley', targetRmsDbfs: -25,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(hardwoodFootstep, woodPlatformLanding, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [hardwoodFootstep, 0, 0.17, 0.79, 1.11, 9600, 0, 0.001, 0.022],
      [woodPlatformLanding, 0.098, 0.19, 0.31, 1.23, 8100, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.091, 0.21, 0.14, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
