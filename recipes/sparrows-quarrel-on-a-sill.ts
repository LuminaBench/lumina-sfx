import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalSparrow from './_recordings/natural-sparrow.ts';
import fieldBirdFlutter from './_recordings/field-bird-flutter.ts';

export default {
  id: 'sparrows-quarrel-on-a-sill', name: "Sparrows quarrel on a sill", category: 'Animals',
  tags: ["sparrow", "chirp", "house", "garden"],
  loopable: false, durationSec: 1.222, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalSparrow, fieldBirdFlutter),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalSparrow, 0.0, 0.31, 0.91, 1, 10500, 0, 0.001, 0.022],
      [naturalSparrow, 0.2, 0.25, 0.57, 1.11, 10500, 0, 0.001, 0.022],
      [naturalSparrow, 0.555, 0.31, 0.8, 1, 10500, 0, 0.001, 0.022],
      [fieldBirdFlutter, 0.79, 0.35, 0.35, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.012, 0.032], send: 0.075, dampingHz: 4400 });
  },
} satisfies SoundRecipe;
