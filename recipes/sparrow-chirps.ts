import type { SoundRecipe } from '../engine/types.ts';
import { birds } from './_shared/animals.ts';

export default {
  id: "sparrow-chirps", name: "Sparrow Chirps", category: 'Animals',
  tags: ["bird","sparrow","chirp","garden"], loopable: false, durationSec: 0.96,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.71 } },
  targetRmsDbfs: -24,
  render(ctx, { params }) {
    return birds(ctx, [[0, 3920, 4780, 3380, 0.063, 1, 0.42], [0.105, 3610, 4785, 3110, 0.073, 0.83, 0.61], [0.264, 4150, 5080, 3630, 0.055, 0.74, 0.44], [0.377, 3660, 4490, 3240, 0.074, 0.82, 0.39]], 1.16 - params.pace * 0.33);
  },
} satisfies SoundRecipe;
