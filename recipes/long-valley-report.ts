import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/clarity-field.ts';
import foley1 from './_recordings/clarity-distant.ts';
import { arenaReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

const original = {
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

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.38, gain: 1.13, cutoff: 7600, speed: 0.91 },
  { clip: foley1, at: 0.28, span: 0.9, gain: 0.63, cutoff: 2350, speed: 0.96 },
]);
