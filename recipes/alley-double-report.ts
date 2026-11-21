import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "alley-double-report", name: "Alley Double Report", category: "Weapons",
  tags: ["game", "report", "alley", "urban", "double", "echo"],
  loopable: false, durationSec: 0.64, targetRmsDbfs: -18,
  params: { body: { label: "Body", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return arenaReport(ctx, {
      span: 0.0070, body: 218, crack: 5090, edge: 1.08, action: 0.08, space: "alley", hits: [0, 0.154],
    }, params.body);
  },
} satisfies SoundRecipe;
