import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "long-valley-report", name: "Long Valley Report", category: "Weapons",
  tags: ["game", "report", "distant", "echo", "valley"],
  loopable: false, durationSec: 0.72, targetRmsDbfs: -22,
  params: { body: { label: "Body", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return arenaReport(ctx, {
      span: 0.0108, body: 139, crack: 4050, edge: 0.69, action: 0, space: "overlook",
    }, params.body);
  },
} satisfies SoundRecipe;
