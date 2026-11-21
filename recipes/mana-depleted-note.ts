import { runeChime } from "./_shared/game-magic.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "mana-depleted-note", name: "Mana Depleted Note", category: "Sci-Fi & UI",
  tags: ["mana", "depleted", "spell", "fail", "warning"],
  loopable: false, durationSec: 0.51, targetRmsDbfs: -23,
  params: { bloom: { label: "Bloom", min: 0, max: 1, default: 0.58 } },
  render(ctx, { params }) {
    return runeChime(ctx, [
      { at: 0, hz: 469, hold: 0.071, level: 0.98 },
      { at: 0.12, hz: 280, hold: 0.099, level: 0.76 },
    ], params.bloom, "wood");
  },
} satisfies SoundRecipe;
