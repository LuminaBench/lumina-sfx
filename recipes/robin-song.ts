import type { SoundRecipe } from '../engine/types.ts';
import { birds } from './_shared/animals.ts';

export default {
  id: "robin-song", name: "Robin Song", category: 'Animals',
  tags: ["bird","robin","song","garden"], loopable: false, durationSec: 1.72,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  targetRmsDbfs: -24,
  render(ctx, { params }) {
    return birds(ctx, [[0, 2520, 3860, 3330, 0.172, 0.86, 0.13], [0.228, 3250, 4450, 2310, 0.12, 1, 0.18], [0.39, 2630, 3620, 3100, 0.087, 0.76, 0.24], [0.504, 3370, 4610, 3970, 0.076, 0.77, 0.16], [0.64, 3120, 3920, 1940, 0.151, 0.71, 0.20], [1.04, 2700, 3930, 3210, 0.094, 0.59, 0.27]], 1.15 - params.pace * 0.30);
  },
} satisfies SoundRecipe;
