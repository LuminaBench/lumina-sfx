import { shieldGesture } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "energy-shield-collapse", name: "Energy Shield Collapse", category: "Sci-Fi & UI",
  tags: ["shield", "barrier", "failure", "energy"],
  loopable: false, durationSec: 0.73, targetRmsDbfs: -21,
  params: { edge: { label: "Edge", min: 0, max: 1, default: 0.53 } },
  render(ctx, { params }) {
    return shieldGesture(ctx, [
      { time: 0, modes: [620, 1270, 1770], decay: 0.065, bend: 1.7, burst: 0.91 },
      { time: 0.109, modes: [330, 431, 890], decay: 0.076, bend: 1.45, burst: 0.54 },
      { time: 0.253, modes: [123, 261], decay: 0.049, bend: 1.27, burst: 0.38 },
    ], params.edge);
  },
} satisfies SoundRecipe;
