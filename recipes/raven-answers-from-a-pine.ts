import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalRaven from './_recordings/natural-raven.ts';

export default {
  id: 'raven-answers-from-a-pine', name: "Raven answers from a pine", category: 'Animals',
  tags: ["raven", "croak", "answer", "forest"],
  loopable: false, durationSec: 1.871, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalRaven),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalRaven, 0.0, 0.65, 0.94, 1, 10500, 0, 0.001, 0.022],
      [naturalRaven, 1.01, 0.67, 0.47, 0.985, 5100.0, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
