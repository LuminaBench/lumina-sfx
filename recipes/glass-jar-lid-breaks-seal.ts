import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldJarTurn from './_recordings/field-jar-turn.ts';
import fieldJarPop from './_recordings/field-jar-pop.ts';
import fieldGlassLid from './_recordings/field-glass-lid.ts';

export default {
  id: 'glass-jar-lid-breaks-seal', name: "Glass jar lid breaks seal", category: 'Props & Interactions',
  tags: ["jar", "preserve", "open", "canning", "kitchen"],
  loopable: false, durationSec: 0.882, mixRole: 'detail', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldJarTurn, fieldJarPop, fieldGlassLid),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [fieldJarTurn, 0.0, 0.43, 0.78, 1, 10500, 0, 0.001, 0.022],
      [fieldJarPop, 0.36, 0.24, 0.81, 1, 10500, 0, 0.001, 0.022],
      [fieldGlassLid, 0.51, 0.29, 0.42, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
