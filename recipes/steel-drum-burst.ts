import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "steel-drum-burst", name: "Steel Drum Burst", category: "Impacts",
  tags: ["explosion", "steel", "drum", "enclosure", "crash"],
  loopable: false, durationSec: 0.75, targetRmsDbfs: -18,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return destruction(ctx, {
      cracks: [
        { at: 0, width: 0.01, weight: 1.02, bite: 1.38, bloom: 0.061 },
        { at: 0.042, width: 0.007, weight: 0.44, bite: 0.97, bloom: 0.05 },
      ],
      debris: "steel", debrisAt: 0.011, debrisSpan: 0.44, fragments: 17, space: "room",
    }, params.weight);
  },
} satisfies SoundRecipe;
