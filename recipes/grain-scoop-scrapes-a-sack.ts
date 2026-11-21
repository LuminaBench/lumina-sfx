import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import burlapFeedSackOpen from './_recordings/burlap-feed-sack-open.ts';
import trowelSoftSoil from './_recordings/trowel-soft-soil.ts';
import plantLargeSeeds from './_recordings/plant-large-seeds.ts';

export default {
  id: 'grain-scoop-scrapes-a-sack', name: "Grain scoop scrapes a sack", category: 'Props & Interactions',
  tags: ["farm", "grain", "scoop", "sack", "feeding"],
  loopable: false, durationSec: 0.84, mixRole: 'detail', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(burlapFeedSackOpen, trowelSoftSoil, plantLargeSeeds),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [burlapFeedSackOpen, 0.0, 0.37, 0.56, 1, 10500, 0, 0.001, 0.022],
      [trowelSoftSoil, 0.18, 0.43, 0.69, 1, 10500, 0, 0.001, 0.022],
      [plantLargeSeeds, 0.51, 0.28, 0.47, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
