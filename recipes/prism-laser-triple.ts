import { energyPackets } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "prism-laser-triple", name: "Prism Laser Triple", category: "Sci-Fi & UI",
  tags: ["laser", "triple", "prism", "future"],
  loopable: false, durationSec: 0.43, targetRmsDbfs: -20,
  params: { charge: { label: "Charge", min: 0, max: 1, default: 0.52 } },
  render(ctx, { params }) {
    return energyPackets(ctx, [
      { time: 0, from: 990, to: 571, bend: 0.014, decay: 0.029, grit: 0.37, gain: 1 },
      { time: 0.065, from: 1360, to: 798, bend: 0.013, decay: 0.029, grit: 0.45, gain: 0.89 },
      { time: 0.151, from: 2040, to: 1040, bend: 0.023, decay: 0.043, grit: 0.66, gain: 0.9 },
    ], params.charge);
  },
} satisfies SoundRecipe;
