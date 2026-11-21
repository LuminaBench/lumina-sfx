import { energyPackets } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "sonic-stun-chirp", name: "Sonic Stun Chirp", category: "Sci-Fi & UI",
  tags: ["sonic", "stun", "chirp", "game"],
  loopable: false, durationSec: 0.24, targetRmsDbfs: -22,
  params: { charge: { label: "Charge", min: 0, max: 1, default: 0.52 } },
  render(ctx, { params }) {
    return energyPackets(ctx, [
      { time: 0, from: 1120, to: 1670, bend: 0.021, decay: 0.038, grit: 0.44, gain: 0.9 },
      { time: 0.012, from: 856, to: 1107, bend: 0.014, decay: 0.029, grit: 0.21, gain: 0.59 },
    ], params.charge);
  },
} satisfies SoundRecipe;
