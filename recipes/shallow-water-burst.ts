import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/shallow-water-footstep.ts';
import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

const original = {
  id: "shallow-water-burst", name: "Shallow Water Burst", category: "Impacts",
  tags: ["explosion", "water", "splash", "game"],
  loopable: false, durationSec: 0.83, targetRmsDbfs: -18,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return destruction(ctx, {
      cracks: [
        { at: 0, width: 0.024, weight: 1.14, bite: 0.7, bloom: 0.091 },
        { at: 0.1, width: 0.018, weight: 0.42, bite: 0.51, bloom: 0.068 },
      ],
      debris: "water", debrisAt: 0.048, debrisSpan: 0.53, fragments: 29, space: "outdoor", color: 3200,
    }, params.weight);
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.42, gain: 0.63, cutoff: 2800, speed: 0.77 },
  { clip: foley1, at: 0.051, span: 0.53, gain: 0.47, cutoff: 7600, speed: 0.86 },
]);
