import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalCrow from './_recordings/natural-crow.ts';
import naturalCrowRoost from './_recordings/natural-crow-roost.ts';

export default {
  id: 'crow-scolds-from-a-rooftop', name: "Crow scolds from a rooftop", category: 'Animals',
  tags: ["crow", "caw", "alarm", "urban"],
  loopable: false, durationSec: 2.312, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalCrow, naturalCrowRoost),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalCrow, 0.0, 0.61, 0.9, 1, 10500, 0, 0.001, 0.022],
      [naturalCrowRoost, 0.58, 0.89, 0.67, 1, 10500, 0, 0.001, 0.022],
      [naturalCrow, 1.61, 0.62, 0.76, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
