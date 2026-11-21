import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSparrow from './_recordings/natural-sparrow.ts';

export default {
  id: 'sparrow-chirps', name: "Sparrow Chirps", category: 'Animals',
  tags: ["bird", "sparrow", "chirp", "garden"],
  loopable: false, durationSec: 0.96, mixRole: 'voice', targetRmsDbfs: -24,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.71 } },
  ...performanceCredits(naturalSparrow),
  render(ctx, { seed, params }) {
    const spacing = 1.19 - 0.28 * params.pace;
    return perform(ctx, seed, params.pace, [
      [naturalSparrow, 0.0, 0.29, 0.91, 1, 10500, 0, 0.001, 0.022],
      [naturalSparrow, 0.34 * spacing, 0.29, 0.71, 1, 10500, 0, 0.001, 0.022],
      [naturalSparrow, 0.676 * spacing, 0.28, 0.85, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
