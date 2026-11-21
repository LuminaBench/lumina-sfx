import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalRaven from './_recordings/natural-raven.ts';

export default {
  id: 'raven-caw', name: "Raven Caw", category: 'Animals',
  tags: ["bird", "raven", "crow", "caw"],
  loopable: false, durationSec: 0.87, mixRole: 'voice', targetRmsDbfs: -20,
  params: { rasp: { label: 'Rasp', min: 0, max: 1, default: 0.72 } },
  ...performanceCredits(naturalRaven),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.rasp, [
      [naturalRaven, 0.0, 0.86, 1.0, 1, 3400 + 8200 * params.rasp, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
