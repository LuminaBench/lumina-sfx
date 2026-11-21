import { motorGesture } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "robot-motor-stall", name: "Robot Motor Stall", category: "Sci-Fi & UI",
  tags: ["motor", "robot", "stall", "fail"],
  loopable: false, durationSec: 0.52, targetRmsDbfs: -22,
  params: { strength: { label: "Strength", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return motorGesture(ctx, "stall", params.strength);
  },
} satisfies SoundRecipe;
