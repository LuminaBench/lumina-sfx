import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "fasten-twine-sheaf", name: "Cinching Twine around a Sheaf", category: "Farming",
  tags: ["twine", "rope", "sheaf", "tie", "bundle"],
  durationSec: .78, loopable: false, targetRmsDbfs: -26,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'rope', .57, 1460, .071],
      [.115, 'leaf', .32, 3130, .065],
      [.181, 'rope', .73, 1710, .077],
      [.302, 'snap', .53, 2060, .025],
      [.364, 'leaf', .38, 2820, .041],
    ]);
  },
} satisfies SoundRecipe;
