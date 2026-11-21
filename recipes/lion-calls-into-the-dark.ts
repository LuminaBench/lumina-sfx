import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalLion from './_recordings/natural-lion.ts';

export default {
  id: 'lion-calls-into-the-dark', name: "Lion calls into the dark", category: 'Animals',
  tags: ["lion", "roar", "night", "animal"],
  loopable: false, durationSec: 3.772, mixRole: 'voice', targetRmsDbfs: -22,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalLion),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalLion, 0.0, 1.65, 0.97, 1, 10500, 0, 0.001, 0.022],
      [naturalLion, 2.14, 1.48, 0.7, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
