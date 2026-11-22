import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';
import naturalPlanks from './_recordings/natural-planks.ts';
import barnTimberCreak from './_recordings/barn-timber-creak.ts';

export default {
  id: 'distant-impact-through-a-floor', name: "Distant impact through a floor", category: 'Combat Foley',
  tags: ["body", "fall", "impact", "muffled", "upstairs"],
  loopable: false, durationSec: 0.622, mixRole: 'impact', targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(twoFootLanding, naturalPlanks, barnTimberCreak),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [twoFootLanding, 0.0, 0.24, 0.9, 0.9, 1900.0, 0, 0.001, 0.022],
      [naturalPlanks, 0.057, 0.17, 0.44, 0.94, 1400.0, 0, 0.001, 0.022],
      [barnTimberCreak, 0.11, 0.43, 0.24, 0.92, 2200.0, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
