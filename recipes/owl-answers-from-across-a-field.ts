import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalOwlAnswer from './_recordings/natural-owl-answer.ts';
import naturalOwl from './_recordings/natural-owl.ts';

export default {
  id: 'owl-answers-from-across-a-field', name: "Owl answers from across a field", category: 'Animals',
  tags: ["owl", "call", "nocturnal", "distant"],
  loopable: false, durationSec: 3.201, mixRole: 'voice', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalOwlAnswer, naturalOwl),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalOwlAnswer, 0.0, 1.67, 0.73, 1.0, 4300.0, 0, 0.001, 0.022],
      [naturalOwl, 2.05, 0.96, 0.37, 0.99, 2800.0, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
