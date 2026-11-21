import type { SoundRecipe } from '../engine/types.ts';
import { birds } from './_shared/animals.ts';

export default {
  id: "owl-double-hoot", name: "Owl Double Hoot", category: 'Animals',
  tags: ["bird","owl","hoot","night"], loopable: false, durationSec: 1.85,
  params: { depth: { label: "Depth", min: 0, max: 1, default: 0.64 } },
  targetRmsDbfs: -23,
  render(ctx, { params }) {
    const depth = 1.12 - params.depth * 0.28;
    return birds(ctx, [[0, 320 * depth, 433 * depth, 352 * depth, 0.31, 1, 0.12], [0.454, 296 * depth, 393 * depth, 289 * depth, 0.40, 0.87, 0.12]], 1);
  },
} satisfies SoundRecipe;
