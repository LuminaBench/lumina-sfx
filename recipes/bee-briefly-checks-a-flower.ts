import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import insideBeehiveLoop from './_recordings/inside-beehive-loop.ts';
import dryVineBrush from './_recordings/dry-vine-brush.ts';

export default {
  id: 'bee-briefly-checks-a-flower', name: "Bee briefly checks a flower", category: 'Animals',
  tags: ["bee", "insect", "buzzing", "close", "flower"],
  loopable: false, durationSec: 1.68, mixRole: 'voice', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(insideBeehiveLoop, dryVineBrush),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [insideBeehiveLoop, 0.0, 0.89, 0.54, 1.04, 6500.0, 2.3, 0.001, 0.022],
      [insideBeehiveLoop, 0.5, 0.99, 0.9, 1.0, 7700.0, 4.2, 0.001, 0.022],
      [dryVineBrush, 1.44, 0.19, 0.09, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
