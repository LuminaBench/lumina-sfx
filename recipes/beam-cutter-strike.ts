import { energyPackets } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "beam-cutter-strike", name: "Beam Cutter Strike", category: "Sci-Fi & UI",
  tags: ["beam", "cutter", "strike", "zap", "sparks"],
  loopable: false, durationSec: 0.34, targetRmsDbfs: -20,
  params: { charge: { label: "Charge", min: 0, max: 1, default: 0.52 } },
  render(ctx, { params }) {
    return energyPackets(ctx, [
      { time: 0, from: 560, to: 203, bend: 0.034, decay: 0.086, grit: 1.0, gain: 1 },
      { time: 0.031, from: 3593, to: 920, bend: 0.016, decay: 0.041, grit: 0.96, gain: 0.38 },
    ], params.charge);
  },
} satisfies SoundRecipe;
