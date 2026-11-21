import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalOwl from './_recordings/natural-owl.ts';
import naturalOwlAnswer from './_recordings/natural-owl-answer.ts';

export default {
  id: 'tawny-owl-begins-its-night-call', name: "Tawny owl begins its night call", category: 'Animals',
  tags: ["owl", "hoot", "territorial", "bird"],
  loopable: false, durationSec: 3.131, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalOwl, naturalOwlAnswer),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalOwl, 0.0, 0.94, 0.95, 1, 10500, 0, 0.001, 0.022],
      [naturalOwlAnswer, 1.3, 1.64, 0.81, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
