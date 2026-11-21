import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import leatherStrapFlex from './_recordings/leather-strap-flex.ts';
import fieldHorseBreath from './_recordings/field-horse-breath.ts';

export default {
  id: 'horse-settles-under-its-tack', name: "Horse settles under its tack", category: 'Animals',
  tags: ["horse", "leather", "saddle", "breath"],
  loopable: false, durationSec: 1.17, mixRole: 'voice', targetRmsDbfs: -26,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(leatherStrapFlex, fieldHorseBreath),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [leatherStrapFlex, 0.0, 0.52, 0.52, 1, 10500, 0, 0.001, 0.022],
      [fieldHorseBreath, 0.262, 0.62, 0.85, 1, 10500, 0, 0.001, 0.022],
      [leatherStrapFlex, 0.85, 0.27, 0.19, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
