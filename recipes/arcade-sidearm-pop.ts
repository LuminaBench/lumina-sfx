import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-pistol.ts';
import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

const original = {
  id: "arcade-sidearm-pop", name: "Arcade Sidearm Pop", category: "Weapons",
  tags: ["game", "report", "sidearm", "close"],
  loopable: false, durationSec: 0.16, targetRmsDbfs: -18,
  params: { body: { label: "Body", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return arenaReport(ctx, {
      span: 0.0028, body: 261, crack: 4750, edge: 1.39, action: 0.15, space: "close",
    }, params.body);
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.11, gain: 1.1, cutoff: 11300, speed: 1.14 },
]);
