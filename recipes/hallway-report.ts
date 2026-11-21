import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-pistol.ts';
import foley1 from './_recordings/clarity-rifle.ts';
import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

const original = {
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

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.19, gain: 1.1, cutoff: 11300, speed: 1.01 },
  { clip: foley1, at: 0.041, span: 0.15, gain: 0.35, cutoff: 3800, speed: 0.98 },
]);
