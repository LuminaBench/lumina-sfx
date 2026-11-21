import { dustAndRubble } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "ice-chip-fallout", name: "Ice Chip Fallout", category: "Impacts",
  tags: ["ice", "debris", "particles", "fallout"],
  loopable: false, durationSec: 0.76, targetRmsDbfs: -23,
  params: { density: { label: "Density", min: 0, max: 1, default: 0.58 } },
  render(ctx, { params }) {
    return dustAndRubble(ctx, "ice", params.density);
  },
} satisfies SoundRecipe;
