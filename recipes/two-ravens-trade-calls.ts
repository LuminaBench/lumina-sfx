import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalRaven from './_recordings/natural-raven.ts';

export default {
  id: 'two-ravens-trade-calls', name: "Two ravens trade calls", category: 'Animals',
  tags: ["raven", "croak", "pair", "woodland"],
  loopable: false, durationSec: 2.532, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalRaven),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalRaven, 0.0, 0.59, 0.91, 1, 10500, 0, 0.001, 0.022],
      [naturalRaven, 0.83, 0.73, 0.57, 0.982, 6300.0, 0, 0.001, 0.022],
      [naturalRaven, 1.76, 0.62, 0.73, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
