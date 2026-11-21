import { shieldGesture } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "energy-shield-block", name: "Energy Shield Block", category: "Sci-Fi & UI",
  tags: ["shield", "block", "deflect", "energy"],
  loopable: false, durationSec: 0.54, targetRmsDbfs: -21,
  params: { edge: { label: "Edge", min: 0, max: 1, default: 0.53 } },
  render(ctx, { params }) {
    return shieldGesture(ctx, [
      { time: 0, modes: [367, 761, 1291], decay: 0.108, bend: 1.6, burst: 1.02 },
      { time: 0.081, modes: [211, 393], decay: 0.052, bend: 0.9, burst: 0.32 },
    ], params.edge);
  },
} satisfies SoundRecipe;
