import { magicPassage } from "./_shared/game-magic.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "shadow-spell-cast", name: "Shadow Spell Cast", category: "Sci-Fi & UI",
  tags: ["shadow", "dark", "cast", "magic", "spell"],
  loopable: false, durationSec: 0.69, targetRmsDbfs: -22,
  params: { shimmer: { label: "Shimmer", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return magicPassage(ctx, [
      { at: 0, from: 371, to: 111, attack: 0.045, decay: 0.168, wind: 0.33, level: 0.84 },
      { at: 0.15, from: 212, to: 63, attack: 0.026, decay: 0.126, wind: 0.22, level: 0.54 },
    ], params.shimmer);
  },
} satisfies SoundRecipe;
