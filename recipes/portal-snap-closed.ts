import { magicPassage } from "./_shared/game-magic.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "portal-snap-closed", name: "Portal Snap Closed", category: "Sci-Fi & UI",
  tags: ["portal", "close", "warp", "spell"],
  loopable: false, durationSec: 0.76, targetRmsDbfs: -22,
  params: { shimmer: { label: "Shimmer", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return magicPassage(ctx, [
      { at: 0, from: 735, to: 145, attack: 0.027, decay: 0.145, wind: 0.73, level: 0.81 },
      { at: 0.199, from: 259, to: 100, attack: 0.005, decay: 0.089, wind: 0.32, level: 0.71 },
    ], params.shimmer);
  },
} satisfies SoundRecipe;
