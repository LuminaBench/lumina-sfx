import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
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
