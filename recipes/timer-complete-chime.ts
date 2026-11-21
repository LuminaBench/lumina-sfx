import type { SoundRecipe } from '../engine/types.ts';
import { beeps } from './_shared/alerts.ts';

export default {
  id: "timer-complete-chime", name: "Timer Complete Chime", category: "Sci-Fi & UI",
  tags: ["timer","done","chime","success"], loopable: false, durationSec: 1.1,
  params: { color: { label: "Color", min: 0, max: 1, default: 0.52 } },
  targetRmsDbfs: -23,
  render(ctx, { params }) {
    return beeps(ctx, [[0, 512, 0.11, 0.91], [0.128, 645, 0.11, 0.76], [0.25, 811, 0.34, 0.97]], params.color, 'soft');
  },
} satisfies SoundRecipe;
