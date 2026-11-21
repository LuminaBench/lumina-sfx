import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalCrowRoost from './_recordings/natural-crow-roost.ts';
import naturalCrow from './_recordings/natural-crow.ts';

export default {
  id: 'crows-circling-above-a-clearing', name: "Crows circling above a clearing", category: 'Animals',
  tags: ["crow", "flock", "circling", "caw"],
  loopable: false, durationSec: 3.171, mixRole: 'voice', targetRmsDbfs: -26,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalCrowRoost, naturalCrow),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalCrowRoost, 0.0, 1.32, 0.67, 1, 10500, 0, 0.001, 0.022],
      [naturalCrowRoost, 0.87, 1.38, 0.74, 0.986, 5900.0, 0, 0.001, 0.022],
      [naturalCrow, 2.37, 0.61, 0.43, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
