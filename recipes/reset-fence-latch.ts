import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "reset-fence-latch", name: "Lifting and Fastening a Paddock Latch", category: "Farming",
  tags: ["latch", "paddock", "gate", "close", "fence", "metal"],
  durationSec: .67, loopable: false, targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  spectrum: [{ band: 'high', minShare: 0.013 }],
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'metal', .40, 684, .048],
      [.08, 'rope', .36, 1480, .029],
      [.254, 'metal', .68, 1090, .059],
      [.269, 'wood', .48, 200, .061],
      [.292, 'stone', .30, 3630, .042],
      [.296, 'snap', .20, 6360, .022],
    ]);
  },
} satisfies SoundRecipe;
