import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hardwoodFootstep from './_recordings/hardwood-footstep.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';

export default {
  id: 'polished-hardwood-limping-gait', name: "Polished hardwood limping gait", category: 'Footsteps & UI',
  tags: ["indoor", "oak", "wooden", "floor", "footstep", "injured", "limp", "irregular", "walk", "cycle"],
  loopable: false, durationSec: 1.698, mixRole: 'foley', targetRmsDbfs: -26,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(hardwoodFootstep, woodPlatformLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.weight, [
      [hardwoodFootstep, 0, 0.2581, 1, 0.93, 9600, 0, 0.001, 0.022],
      [woodPlatformLanding, 0.168, 0.27, 0.35, 0.86, 5600, 0, 0.001, 0.045],
      [hardwoodFootstep, 0.346, 0.2222, 0.41, 1.08, 5200, 0, 0.001, 0.022],
      [hardwoodFootstep, 1.047, 0.25, 0.9, 0.96, 9600, 0, 0.001, 0.022],
      [woodPlatformLanding, 1.214, 0.22, 0.31, 0.9, 5800, 0, 0.001, 0.045],
      [hardwoodFootstep, 1.385, 0.2308, 0.37, 1.04, 5100, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
