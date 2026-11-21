import { motorGesture } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "plasma-vent-hiss", name: "Plasma Vent Hiss", category: "Sci-Fi & UI",
  tags: ["vent", "steam", "cooling", "plasma"],
  loopable: false, durationSec: 0.91, targetRmsDbfs: -22,
  params: { strength: { label: "Strength", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return motorGesture(ctx, "vent", params.strength);
  },
} satisfies SoundRecipe;
