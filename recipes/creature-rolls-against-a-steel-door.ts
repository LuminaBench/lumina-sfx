import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import fieldHeavyHatch from './_recordings/field-heavy-hatch.ts';
import naturalGrowl from './_recordings/natural-growl.ts';

export default {
  id: 'creature-rolls-against-a-steel-door', name: "Creature rolls against a steel door", category: 'Zombies & Combat',
  tags: ["creature", "body", "impact", "hatch"],
  loopable: false, durationSec: 1.147, mixRole: 'voice', targetRmsDbfs: -23,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(twoFootLanding, fieldHeavyHatch, naturalGrowl),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [twoFootLanding, 0.0, 0.23, 0.89, 1, 10500, 0, 0.001, 0.022],
      [fieldHeavyHatch, 0.03, 0.61, 0.47, 1, 10500, 0, 0.001, 0.022],
      [naturalGrowl, 0.28, 0.73, 0.73, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.037, 0.087], send: 0.19, dampingHz: 2900 });
  },
} satisfies SoundRecipe;
