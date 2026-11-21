import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "canyon-single-report", name: "Canyon Single Report", category: "Weapons",
  tags: ["game", "report", "canyon", "outdoor", "slapback"],
  loopable: false, durationSec: 0.91, targetRmsDbfs: -20,
  params: { body: { label: "Body", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return arenaReport(ctx, {
      span: 0.0073, body: 170, crack: 4700, edge: 1.15, action: 0, space: "canyon",
    }, params.body);
  },
} satisfies SoundRecipe;
