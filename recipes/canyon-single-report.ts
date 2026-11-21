import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-field.ts';
import foley1 from './_recordings/clarity-distant.ts';
import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

const original = {
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

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.38, gain: 1.13, cutoff: 8700, speed: 0.91 },
  { clip: foley1, at: 0.215, span: 0.75, gain: 0.63, cutoff: 2350, speed: 0.96 },
]);
