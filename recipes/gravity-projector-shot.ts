import { energyPackets } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "gravity-projector-shot", name: "Gravity Projector Shot", category: "Sci-Fi & UI",
  tags: ["gravity", "blaster", "energy", "projectile"],
  loopable: false, durationSec: 0.52, targetRmsDbfs: -18,
  params: { charge: { label: "Charge", min: 0, max: 1, default: 0.52 } },
  render(ctx, { params }) {
    return energyPackets(ctx, [
      { time: 0, from: 470, to: 61, bend: 0.041, decay: 0.106, grit: 0.91, gain: 1 },
      { time: 0.019, from: 1409, to: 224, bend: 0.025, decay: 0.048, grit: 0.48, gain: 0.53 },
    ], params.charge);
  },
} satisfies SoundRecipe;
