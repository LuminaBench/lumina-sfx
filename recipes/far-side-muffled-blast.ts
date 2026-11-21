import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/atlas-stone.ts';
import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

const original = {
  id: "far-side-muffled-blast", name: "Far-Side Muffled Blast", category: "Impacts",
  tags: ["explosion", "distant", "occluded", "muffled"],
  loopable: false, durationSec: 1.08, targetRmsDbfs: -22,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return destruction(ctx, {
      cracks: [
        { at: 0, width: 0.029, weight: 1.59, bite: 0.6, bloom: 0.12 },
        { at: 0.142, width: 0.031, weight: 0.67, bite: 0.42, bloom: 0.108 },
      ],
      debris: "none", debrisAt: 0, debrisSpan: 0, fragments: 0, space: "outdoor", color: 1000,
    }, params.weight);
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.4, gain: 0.63, cutoff: 630, speed: 0.77 },
  { clip: foley1, at: 0.08, span: 0.65, gain: 0.19, cutoff: 1000, speed: 0.86 },
]);
