import { runeChime } from "./_shared/game-magic.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "wooden-rune-select", name: "Wooden Rune Select", category: "Sci-Fi & UI",
  tags: ["rune", "wood", "selection", "interface", "fantasy"],
  loopable: false, durationSec: 0.36, targetRmsDbfs: -23,
  params: { bloom: { label: "Bloom", min: 0, max: 1, default: 0.58 } },
  render(ctx, { params }) {
    return runeChime(ctx, [
      { at: 0, hz: 392, hold: 0.045, level: 1 },
      { at: 0.042, hz: 523, hold: 0.049, level: 0.63 },
    ], params.bloom, "wood");
  },
} satisfies SoundRecipe;
