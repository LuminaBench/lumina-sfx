import { arenaMechanism } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "empty-action-click", name: "Empty Action Click", category: "Weapons",
  tags: ["game", "mechanical", "empty", "trigger", "click", "dry"],
  loopable: false, durationSec: 0.1, targetRmsDbfs: -23,
  params: { firmness: { label: "Firmness", min: 0, max: 1, default: 0.56 } },
  render(ctx, { params }) {
    return arenaMechanism(ctx, {
      snaps: [[0, 790, 4630, 0.003, 0.95], [0.011, 570, 2990, 0.002, 0.34]],
    }, params.firmness);
  },
} satisfies SoundRecipe;
