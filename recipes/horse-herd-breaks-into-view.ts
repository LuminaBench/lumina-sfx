import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalHooves from './_recordings/natural-hooves.ts';
import horseWhinny from './_recordings/horse-whinny.ts';

export default {
  id: 'horse-herd-breaks-into-view', name: "Horse herd breaks into view", category: 'Animals',
  tags: ["horse", "gallop", "hooves", "group", "passing"],
  loopable: false, durationSec: 4.122, mixRole: 'voice', targetRmsDbfs: -23,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalHooves, horseWhinny),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalHooves, 0.0, 1.31, 0.51, 1.01, 4700.0, 0, 0.001, 0.022],
      [naturalHooves, 1.06, 1.68, 1.0, 1, 10500, 0, 0.001, 0.022],
      [horseWhinny, 2.25, 1.72, 0.52, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
