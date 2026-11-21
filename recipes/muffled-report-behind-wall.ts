import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "muffled-report-behind-wall", name: "Muffled Report Behind a Wall", category: "Weapons",
  tags: ["game", "report", "occluded", "interior", "wall"],
  loopable: false, durationSec: 0.47, targetRmsDbfs: -23,
  params: { body: { label: "Body", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return arenaReport(ctx, {
      span: 0.0133, body: 165, crack: 3700, edge: 0.68, action: 0, space: "behind",
    }, params.body);
  },
} satisfies SoundRecipe;
