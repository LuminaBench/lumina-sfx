import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldBrookBed from './_recordings/field-brook-bed.ts';
import naturalBear from './_recordings/natural-bear.ts';

export default {
  id: 'grizzly-heard-across-a-creek', name: "Grizzly heard across a creek", category: 'Animals',
  tags: ["bear", "grizzly", "distant", "stream"],
  loopable: false, durationSec: 3.232, mixRole: 'voice', targetRmsDbfs: -27,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldBrookBed, naturalBear),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldBrookBed, 0.0, 3.08, 0.2, 1.0, 3800.0, 1.0, 0.001, 0.022],
      [naturalBear, 0.27, 2.65, 0.86, 0.98, 3600.0, 0, 0.001, 0.022],
    ], { taps: [0.042, 0.102], send: 0.055, dampingHz: 2600 });
  },
} satisfies SoundRecipe;
