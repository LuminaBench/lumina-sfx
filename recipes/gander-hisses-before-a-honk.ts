import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldGooseHiss from './_recordings/field-goose-hiss.ts';
import gooseSingleHonk from './_recordings/goose-single-honk.ts';
import fieldWings from './_recordings/field-wings.ts';

export default {
  id: 'gander-hisses-before-a-honk', name: "Gander hisses before a honk", category: 'Animals',
  tags: ["goose", "gander", "hiss", "warning"],
  loopable: false, durationSec: 1.532, mixRole: 'voice', targetRmsDbfs: -23,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldGooseHiss, gooseSingleHonk, fieldWings),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldGooseHiss, 0.0, 0.81, 0.97, 1, 10500, 0, 0.001, 0.022],
      [gooseSingleHonk, 0.84, 0.4, 0.86, 1, 10500, 0, 0.001, 0.022],
      [fieldWings, 1.01, 0.37, 0.33, 1, 10500, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
