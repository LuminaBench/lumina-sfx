import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSparrow from './_recordings/natural-sparrow.ts';
import fieldBirdFlutter from './_recordings/field-bird-flutter.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'sparrows-startle-out-of-ivy', name: "Sparrows startle out of ivy", category: 'Animals',
  tags: ["sparrow", "flight", "flock", "flutter"],
  loopable: false, durationSec: 1.211, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSparrow, fieldBirdFlutter, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalSparrow, 0.0, 0.28, 0.79, 1, 10500, 0, 0.001, 0.022],
      [fieldBirdFlutter, 0.16, 0.72, 0.84, 1, 10500, 0, 0.001, 0.022],
      [naturalSparrow, 0.5, 0.24, 0.39, 1, 10500, 0, 0.001, 0.022],
      [dryVineBrush, 0.7, 0.32, 0.19, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.073, 0.141], send: 0.13, dampingHz: 2100 });
  },
} satisfies SoundRecipe;
