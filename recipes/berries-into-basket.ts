import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "berries-into-basket", name: "Berries Dropped into Wicker", category: "Farming",
  tags: ["berries", "wicker", "basket", "pick", "drop", "harvest"],
  durationSec: .72, loopable: false, targetRmsDbfs: -28,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'rope', .32, 2070, .045],
      [.037, 'wood', .32, 354, .031],
      [.104, 'earth', .40, 690, .035],
      [.149, 'wood', .52, 288, .032],
      [.187, 'earth', .44, 560, .043],
      [.281, 'wood', .29, 410, .034],
      [.348, 'earth', .38, 470, .051],
    ]);
  },
} satisfies SoundRecipe;
