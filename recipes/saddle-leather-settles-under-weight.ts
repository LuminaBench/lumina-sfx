import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import twoFootLanding from './_recordings/two-foot-landing.ts';

export default {
  id: 'saddle-leather-settles-under-weight', name: "Saddle leather settles under weight", category: 'Props & Interactions',
  tags: ["horse", "saddle", "leather", "mount", "foley"],
  loopable: false, durationSec: 0.84, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(leatherStrapFlex, twoFootLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [leatherStrapFlex, 0.0, 0.54, 0.89, 1, 10500, 0, 0.001, 0.022],
      [twoFootLanding, 0.14, 0.14, 0.17, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.49, 0.3, 0.52, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
