import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGravel from './_recordings/natural-gravel.ts';
import naturalGravelDrag from './_recordings/natural-gravel-drag.ts';

export default {
  id: 'gravel-check-step-and-turn', name: "Boot checks its stride and turns on gravel", category: 'Combat Foley',
  tags: ["gravel", "check", "step", "and", "turn"], contains: ["planted boot", "gravel twisting under sole", "weight shifts away"], perspective: 'close ground',
  markers: {"plant": 0, "pivot": 0.27}, loopable: false, durationSec: 0.79,
  mixRole: 'foley', targetRmsDbfs: -23,
  params: { force: { label: 'Gesture force', min: 0, max: 1, default: 0.5 } },
  ...performanceCredits(naturalGravel, naturalGravelDrag),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGravel, 0, 0.25, 0.9, 0.94, 7300],
      [naturalGravelDrag, 0.27, 0.41, 0.53, 1.01, 8100],
      [naturalGravel, 0.62, 0.14, 0.21, 1.06, 5200],
    ]);
  },
} satisfies SoundRecipe;
