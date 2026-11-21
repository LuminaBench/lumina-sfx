import { dustAndRubble } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "dust-fallout", name: "Dust Fallout", category: "Impacts",
  tags: ["dust", "debris", "particles", "fallout"],
  loopable: false, durationSec: 0.92, targetRmsDbfs: -23,
  params: { density: { label: "Density", min: 0, max: 1, default: 0.58 } },
  render(ctx, { params }) {
    return dustAndRubble(ctx, "dust", params.density);
  },
} satisfies SoundRecipe;
