import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';

export default {
  id: 'polished-hardwood-drop-landing-and-recovery', name: "Polished hardwood drop landing and recovery", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "drop", "heavy", "landing", "stumble"],
  loopable: false, durationSec: 0.775, mixRole: 'foley', targetRmsDbfs: -23,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(jacketMovementRustle, hardwoodFootstep, woodPlatformLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [jacketMovementRustle, 0, 0.2, 0.22, 1.04, 5700, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.061, 0.2791, 1, 0.86, 9600, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.109, 0.2553, 0.78, 0.94, 9600, 0, 0.001, 0.022],
      [woodPlatformLanding, 0.177, 0.29, 0.31, 0.9, 7200, 0, 0.001, 0.045],
      [hardwoodFootstep, 0.469, 0.2243, 0.31, 1.07, 5400, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
