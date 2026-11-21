import { dustAndRubble } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "masonry-rubble-settling", name: "Masonry Rubble Settling", category: "Impacts",
  tags: ["rubble", "debris", "particles", "fallout"],
  loopable: false, durationSec: 0.88, targetRmsDbfs: -23,
  params: { density: { label: "Density", min: 0, max: 1, default: 0.58 } },
  render(ctx, { params }) {
    return dustAndRubble(ctx, "rubble", params.density);
  },
} satisfies SoundRecipe;
