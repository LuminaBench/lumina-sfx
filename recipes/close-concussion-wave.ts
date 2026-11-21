import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "close-concussion-wave", name: "Close Concussion Wave", category: "Impacts",
  tags: ["explosion", "concussion", "pressure", "shockwave"],
  loopable: false, durationSec: 0.57, targetRmsDbfs: -18,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return destruction(ctx, {
      cracks: [
        { at: 0, width: 0.017, weight: 1.48, bite: 0.79, bloom: 0.072 },
      ],
      debris: "none", debrisAt: 0, debrisSpan: 0, fragments: 0, space: "dry",
    }, params.weight);
  },
} satisfies SoundRecipe;
