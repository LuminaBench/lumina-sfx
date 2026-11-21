import { motorGesture } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "tractor-beam-grab", name: "Tractor Beam Grab", category: "Sci-Fi & UI",
  tags: ["tractor", "beam", "grab", "magnet"],
  loopable: false, durationSec: 0.75, targetRmsDbfs: -20,
  params: { strength: { label: "Strength", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return motorGesture(ctx, "tractor", params.strength);
  },
} satisfies SoundRecipe;
