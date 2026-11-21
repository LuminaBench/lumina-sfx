import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "wooden-gate-collapse", name: "Wooden Gate Collapse", category: "Impacts",
  tags: ["gate", "wood", "falling", "splinters", "collapse"],
  loopable: false, durationSec: 1.06, targetRmsDbfs: -18,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return destruction(ctx, {
      cracks: [
        { at: 0, width: 0.01, weight: 0.72, bite: 1.23, bloom: 0.055 },
        { at: 0.145, width: 0.017, weight: 0.71, bite: 0.73, bloom: 0.053 },
        { at: 0.318, width: 0.02, weight: 0.57, bite: 0.41, bloom: 0.052 },
      ],
      debris: "wood", debrisAt: 0.037, debrisSpan: 0.7, fragments: 20, space: "room",
    }, params.weight);
  },
} satisfies SoundRecipe;
