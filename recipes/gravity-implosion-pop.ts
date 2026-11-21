import { suctionPop } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "gravity-implosion-pop", name: "Gravity Implosion Pop", category: "Impacts",
  tags: ["implosion", "vacuum", "gravity", "explosion"],
  loopable: false, durationSec: 0.82, targetRmsDbfs: -19,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.54 } },
  spectrum: [{ band: "sub", minShare: 0.1 }],
  render(ctx, { params }) {
    return suctionPop(ctx, params.weight);
  },
} satisfies SoundRecipe;
