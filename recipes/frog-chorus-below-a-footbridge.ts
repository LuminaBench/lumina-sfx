import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import marshFrogsNightLoop from './_recordings/marsh-frogs-night-loop.ts';
import fieldBrookBed from './_recordings/field-brook-bed.ts';

export default {
  id: 'frog-chorus-below-a-footbridge', name: "Frog chorus below a footbridge", category: 'Animals',
  tags: ["frog", "amphibian", "creek", "chorus"],
  loopable: false, durationSec: 3.912, mixRole: 'voice', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(marshFrogsNightLoop, fieldBrookBed),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [marshFrogsNightLoop, 0.0, 3.57, 0.89, 1.0, 7900.0, 2.3, 0.001, 0.022],
      [fieldBrookBed, 0.0, 3.76, 0.15, 1.0, 3800.0, 1.0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
