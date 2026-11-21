import { arenaMechanism } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "magazine-release-drop", name: "Magazine Release and Drop", category: "Weapons",
  tags: ["game", "mechanical", "magazine", "latch", "drop", "bounce"],
  loopable: false, durationSec: 0.5, targetRmsDbfs: -23,
  params: { firmness: { label: "Firmness", min: 0, max: 1, default: 0.56 } },
  render(ctx, { params }) {
    return arenaMechanism(ctx, {
      snaps: [[0, 930, 4790, 0.0044, 0.60], [0.124, 400, 3080, 0.011, 1.05], [0.174, 470, 3580, 0.009, 0.66], [0.216, 310, 2710, 0.006, 0.28]],
    }, params.firmness);
  },
} satisfies SoundRecipe;
