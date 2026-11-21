import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';
import jacketMovementRustle from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'polished-hardwood-braking-skid-to-a-stop', name: "Polished hardwood braking skid to a stop", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "stop", "sprint", "brake", "scuff"],
  loopable: false, durationSec: 0.768, mixRole: 'foley', targetRmsDbfs: -24,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(hardwoodFootstep, woodPlatformLanding, jacketMovementRustle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [hardwoodFootstep, 0, 0.22, 0.81, 1.1, 9600, 0, 0.001, 0.022],
      [hardwoodFootstep, 0.203, 0.2553, 0.95, 0.94, 9600, 0, 0.001, 0.022],
      [woodPlatformLanding, 0.246, 0.44, 0.64, 0.82, 8800, 0, 0.001, 0.045],
      [jacketMovementRustle, 0.287, 0.21, 0.12, 1.04, 5700, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
