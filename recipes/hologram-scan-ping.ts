import { energyPackets } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "hologram-scan-ping", name: "Hologram Scan Ping", category: "Sci-Fi & UI",
  tags: ["hologram", "scanner", "ping", "device"],
  loopable: false, durationSec: 0.4, targetRmsDbfs: -23,
  params: { charge: { label: "Charge", min: 0, max: 1, default: 0.52 } },
  render(ctx, { params }) {
    return energyPackets(ctx, [
      { time: 0, from: 840, to: 1230, bend: 0.042, decay: 0.041, grit: 0.25, gain: 0.79 },
      { time: 0.128, from: 1530, to: 1450, bend: 0.02, decay: 0.063, grit: 0.12, gain: 0.57 },
    ], params.charge);
  },
} satisfies SoundRecipe;
