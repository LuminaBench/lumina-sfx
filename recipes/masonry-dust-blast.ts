import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/atlas-stone.ts';
import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

const original = {
  id: "masonry-dust-blast", name: "Masonry Dust Blast", category: "Impacts",
  tags: ["explosion", "stone", "masonry", "debris"],
  loopable: false, durationSec: 1.18, targetRmsDbfs: -18,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return destruction(ctx, {
      cracks: [
        { at: 0, width: 0.013, weight: 1.25, bite: 1.19, bloom: 0.092 },
        { at: 0.054, width: 0.021, weight: 0.53, bite: 0.52, bloom: 0.065 },
      ],
      debris: "stone", debrisAt: 0.092, debrisSpan: 0.66, fragments: 19, space: "outdoor",
    }, params.weight);
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.42, gain: 0.63, cutoff: 7900, speed: 0.77 },
  { clip: foley1, at: 0.16, span: 0.65, gain: 0.27, cutoff: 7100, speed: 0.86 },
]);
