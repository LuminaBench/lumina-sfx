import { energyPackets } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "magnetic-rail-ping", name: "Magnetic Rail Ping", category: "Sci-Fi & UI",
  tags: ["magnetic", "rail", "ping", "zap"],
  loopable: false, durationSec: 0.4, targetRmsDbfs: -20,
  params: { charge: { label: "Charge", min: 0, max: 1, default: 0.52 } },
  render(ctx, { params }) {
    return energyPackets(ctx, [
      { time: 0, from: 4900, to: 1500, bend: 0.003, decay: 0.016, grit: 0.44, gain: 0.76 },
      { time: 0.009, from: 742, to: 509, bend: 0.022, decay: 0.058, grit: 0.13, gain: 0.61 },
    ], params.charge);
  },
} satisfies SoundRecipe;
