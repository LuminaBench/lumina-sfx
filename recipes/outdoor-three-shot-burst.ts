import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "outdoor-three-shot-burst", name: "Outdoor Three-Shot Burst", category: "Weapons",
  tags: ["game", "report", "outdoor", "field", "burst"],
  loopable: false, durationSec: 0.51, targetRmsDbfs: -18,
  params: { body: { label: "Body", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return arenaReport(ctx, {
      span: 0.0043, body: 195, crack: 5500, edge: 1.41, action: 0.15, space: "field", hits: [0, 0.079, 0.177],
    }, params.body);
  },
} satisfies SoundRecipe;
