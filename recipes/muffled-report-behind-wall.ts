import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-field.ts';
import foley1 from './_recordings/atlas-scrap.ts';
import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

const original = {
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

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.2, gain: 1.13, cutoff: 920, speed: 0.91 },
  { clip: foley1, at: 0.1, span: 0.62, gain: 0.18, cutoff: 1250, speed: 0.85 },
]);
