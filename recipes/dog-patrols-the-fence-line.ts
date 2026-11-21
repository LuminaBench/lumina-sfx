import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalDogbreath from './_recordings/natural-dogbreath.ts';
import dogDoubleBark from './_recordings/dog-double-bark.ts';

export default {
  id: 'dog-patrols-the-fence-line', name: "Dog patrols the fence line", category: 'Animals',
  tags: ["dog", "guard", "bark", "fence"],
  loopable: false, durationSec: 2.552, mixRole: 'voice', targetRmsDbfs: -24,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalDogbreath, dogDoubleBark),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [naturalDogbreath, 0.0, 0.72, 0.53, 1, 10500, 0, 0.001, 0.022],
      [dogDoubleBark, 0.61, 0.74, 0.94, 1, 10500, 0, 0.001, 0.022],
      [dogDoubleBark, 1.67, 0.73, 0.48, 1.02, 5100.0, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
