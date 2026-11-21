import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "hallway-report", name: "Hallway Report", category: "Weapons",
  tags: ["game", "report", "hallway", "indoor", "echo"],
  loopable: false, durationSec: 0.33, targetRmsDbfs: -18,
  params: { body: { label: "Body", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return arenaReport(ctx, {
      span: 0.0051, body: 240, crack: 4700, edge: 1.26, action: 0.12, space: "hall",
    }, params.body);
  },
} satisfies SoundRecipe;
