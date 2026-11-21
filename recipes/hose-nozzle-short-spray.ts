import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "hose-nozzle-short-spray", name: "Garden Hose Short Spray", category: "Farming",
  tags: ["hose", "spray", "nozzle", "water", "garden"],
  durationSec: .84, loopable: false, targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'snap', .37, 2600, .044],
      [.038, 'leaf', .72, 5600, .116],
      [.11, 'water', .31, 1500, .072],
      [.23, 'leaf', .44, 4900, .097],
      [.39, 'leaf', .36, 5000, .08],
      [.57, 'wood', .18, 380, .033],
    ]);
  },
} satisfies SoundRecipe;
