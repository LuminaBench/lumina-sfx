import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import ceramicMugSetDown from './_recordings/ceramic-mug-set-down.ts';
import fieldButterKnife from './_recordings/field-butter-knife.ts';

export default {
  id: 'ceramic-cup-catches-a-spoon', name: "Ceramic cup catches a spoon", category: 'Props & Interactions',
  tags: ["kitchen", "cup", "utensil", "ceramic"],
  loopable: false, durationSec: 0.582, mixRole: 'detail', targetRmsDbfs: -27,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(ceramicMugSetDown, fieldButterKnife),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [ceramicMugSetDown, 0.0, 0.17, 0.59, 1, 10500, 0, 0.001, 0.022],
      [fieldButterKnife, 0.095, 0.27, 0.78, 1, 10500, 0, 0.001, 0.022],
      [fieldButterKnife, 0.34, 0.16, 0.31, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
