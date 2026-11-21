import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldCowFeeding from './_recordings/field-cow-feeding.ts';
import cowMoo from './_recordings/cow-moo.ts';

export default {
  id: 'cow-lifts-muzzle-from-feed', name: "Cow lifts muzzle from feed", category: 'Animals',
  tags: ["cow", "cattle", "bovine", "feeding"],
  loopable: false, durationSec: 3.134, mixRole: 'voice', targetRmsDbfs: -25,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldCowFeeding, cowMoo),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldCowFeeding, 0.0, 1.58, 0.83, 1, 10500, 0, 0.001, 0.022],
      [cowMoo, 1.19, 1.83, 1.0, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.024, 0.064], send: 0.125, dampingHz: 3300 });
  },
} satisfies SoundRecipe;
