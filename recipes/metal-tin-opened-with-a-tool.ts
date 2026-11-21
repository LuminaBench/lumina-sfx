import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldButterKnife from './_recordings/field-butter-knife.ts';
import fieldGlassLid from './_recordings/field-glass-lid.ts';
import fieldJarPop from './_recordings/field-jar-pop.ts';

export default {
  id: 'metal-tin-opened-with-a-tool', name: "Metal tin opened with a tool", category: 'Props & Interactions',
  tags: ["tin", "lid", "kitchen", "inventory"],
  loopable: false, durationSec: 0.732, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldButterKnife, fieldGlassLid, fieldJarPop),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [fieldButterKnife, 0.0, 0.21, 0.49, 1, 10500, 0, 0.001, 0.022],
      [fieldGlassLid, 0.23, 0.32, 0.79, 1, 10500, 0, 0.001, 0.022],
      [fieldJarPop, 0.44, 0.21, 0.58, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
