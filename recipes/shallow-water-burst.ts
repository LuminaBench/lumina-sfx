import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
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
