import { motorGesture } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "power-core-spool-up", name: "Power Core Spool Up", category: "Sci-Fi & UI",
  tags: ["power", "spool", "charge", "motor"],
  loopable: false, durationSec: 0.82, targetRmsDbfs: -21,
  params: { strength: { label: "Strength", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return motorGesture(ctx, "charge", params.strength);
  },
} satisfies SoundRecipe;
