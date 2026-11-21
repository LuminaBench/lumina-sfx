import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "arcade-cracker-pop", name: "Arcade Cracker Pop", category: "Impacts",
  tags: ["blast", "arcade", "cracker", "sparkle"],
  loopable: false, durationSec: 0.23, targetRmsDbfs: -18,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return destruction(ctx, {
      cracks: [
        { at: 0, width: 0.0037, weight: 0.79, bite: 1.64, bloom: 0.021 },
      ],
      debris: "glass", debrisAt: 0.018, debrisSpan: 0.085, fragments: 8, space: "dry",
    }, params.weight);
  },
} satisfies SoundRecipe;
