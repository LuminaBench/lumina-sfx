import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "arcade-scatter-blast", name: "Arcade Scatter Blast", category: "Weapons",
  tags: ["game", "report", "scatter", "close"],
  loopable: false, durationSec: 0.32, targetRmsDbfs: -18,
  params: { body: { label: "Body", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return arenaReport(ctx, {
      span: 0.0125, body: 175, crack: 3190, edge: 0.92, action: 0.20, space: "close", hits: [0, 0.014],
    }, params.body);
  },
} satisfies SoundRecipe;
