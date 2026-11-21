import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
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
