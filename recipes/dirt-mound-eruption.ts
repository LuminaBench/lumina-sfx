import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/spade-turn-loam.ts';
import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

const original = {
  id: "dirt-mound-eruption", name: "Dirt Mound Eruption", category: "Impacts",
  tags: ["explosion", "dirt", "soil", "earth", "eruption"],
  loopable: false, durationSec: 1.14, targetRmsDbfs: -18,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return destruction(ctx, {
      cracks: [
        { at: 0, width: 0.024, weight: 1.49, bite: 0.51, bloom: 0.095 },
        { at: 0.147, width: 0.02, weight: 0.49, bite: 0.47, bloom: 0.065 },
      ],
      debris: "dirt", debrisAt: 0.1, debrisSpan: 0.71, fragments: 21, space: "outdoor", color: 2700,
    }, params.weight);
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.42, gain: 0.63, cutoff: 2600, speed: 0.77 },
  { clip: foley1, at: 0.096, span: 0.55, gain: 0.33, cutoff: 4800, speed: 0.89 },
]);
