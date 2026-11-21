import { arenaMechanism } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "pump-action-slide", name: "Pump Action Slide", category: "Weapons",
  tags: ["game", "mechanical", "pump", "slide", "foley", "clack"],
  loopable: false, durationSec: 0.38, targetRmsDbfs: -23,
  params: { firmness: { label: "Firmness", min: 0, max: 1, default: 0.56 } },
  render(ctx, { params }) {
    return arenaMechanism(ctx, {
      snaps: [[0, 290, 2360, 0.010, 0.82], [0.065, 410, 3170, 0.004, 0.55], [0.151, 470, 3980, 0.007, 1.05]],
      slide: [0.022, 0.130, 1360, 0.60],
    }, params.firmness);
  },
} satisfies SoundRecipe;
