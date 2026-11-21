import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import turkeyGobble from './_recordings/turkey-gobble.ts';
import turkeysAnswering from './_recordings/turkeys-answering.ts';

export default {
  id: 'turkeys-answer-from-the-orchard', name: "Turkeys answer from the orchard", category: 'Animals',
  tags: ["turkey", "flock", "reply", "distance"],
  loopable: false, durationSec: 2.511, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(turkeyGobble, turkeysAnswering),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [turkeyGobble, 0.0, 0.75, 1.0, 1, 10500, 0, 0.001, 0.022],
      [turkeysAnswering, 1.21, 1.11, 0.47, 1.0, 4700.0, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
