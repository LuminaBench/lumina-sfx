import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalLion from './_recordings/natural-lion.ts';

export default {
  id: 'lion-heard-through-a-viewing-shelter', name: "Lion heard through a viewing shelter", category: 'Animals',
  tags: ["lion", "roar", "distant", "shelter"],
  loopable: false, durationSec: 3.612, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalLion),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalLion, 0.0, 1.71, 0.91, 0.99, 3400.0, 0, 0.001, 0.022],
      [naturalLion, 2.18, 1.35, 0.51, 1.0, 2700.0, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
