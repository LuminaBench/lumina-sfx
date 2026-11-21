import { energyPackets } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "optical-pulse-snap", name: "Optical Pulse Snap", category: "Sci-Fi & UI",
  tags: ["laser", "optical", "light", "zap"],
  loopable: false, durationSec: 0.23, targetRmsDbfs: -20,
  params: { charge: { label: "Charge", min: 0, max: 1, default: 0.52 } },
  render(ctx, { params }) {
    return energyPackets(ctx, [
      { time: 0, from: 1820, to: 256, bend: 0.011, decay: 0.032, grit: 0.32, gain: 1 },
    ], params.charge);
  },
} satisfies SoundRecipe;
