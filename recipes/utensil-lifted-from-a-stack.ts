import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldButterKnife from './_recordings/field-butter-knife.ts';
import fieldGlassLid from './_recordings/field-glass-lid.ts';

export default {
  id: 'utensil-lifted-from-a-stack', name: "Utensil lifted from a stack", category: 'Props & Interactions',
  tags: ["kitchen", "cutlery", "pickup", "foley"],
  loopable: false, durationSec: 0.452, mixRole: 'detail', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldButterKnife, fieldGlassLid),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [fieldButterKnife, 0.0, 0.34, 0.73, 1, 10500, 0, 0.001, 0.022],
      [fieldGlassLid, 0.22, 0.15, 0.26, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
