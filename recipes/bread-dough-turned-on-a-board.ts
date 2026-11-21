import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldDoughRoll from './_recordings/field-dough-roll.ts';
import naturalPlanks from './_recordings/natural-planks.ts';

export default {
  id: 'bread-dough-turned-on-a-board', name: "Bread dough turned on a board", category: 'Props & Interactions',
  tags: ["crafting", "food", "kitchen", "baking"],
  loopable: false, durationSec: 1.242, mixRole: 'detail', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldDoughRoll, naturalPlanks),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [fieldDoughRoll, 0.0, 0.77, 0.85, 1, 10500, 0, 0.001, 0.022],
      [naturalPlanks, 0.48, 0.18, 0.17, 1, 10500, 0, 0.001, 0.022],
      [fieldDoughRoll, 0.74, 0.42, 0.59, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
