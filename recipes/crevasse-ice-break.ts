import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "crevasse-ice-break", name: "Crevasse Ice Break", category: "Impacts",
  tags: ["ice", "explosion", "cryo", "cracks", "debris"],
  loopable: false, durationSec: 1.03, targetRmsDbfs: -18,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return destruction(ctx, {
      cracks: [
        { at: 0, width: 0.006, weight: 0.66, bite: 1.38, bloom: 0.041 },
        { at: 0.078, width: 0.014, weight: 0.95, bite: 0.83, bloom: 0.08 },
        { at: 0.179, width: 0.009, weight: 0.43, bite: 1.35, bloom: 0.041 },
      ],
      debris: "ice", debrisAt: 0.031, debrisSpan: 0.55, fragments: 25, space: "outdoor",
    }, params.weight);
  },
} satisfies SoundRecipe;
