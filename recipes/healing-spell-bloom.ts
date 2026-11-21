import { runeChime } from "./_shared/game-magic.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "healing-spell-bloom", name: "Healing Spell Bloom", category: "Sci-Fi & UI",
  tags: ["heal", "healing", "health", "spell", "magic"],
  loopable: false, durationSec: 0.83, targetRmsDbfs: -23,
  params: { bloom: { label: "Bloom", min: 0, max: 1, default: 0.58 } },
  render(ctx, { params }) {
    return runeChime(ctx, [
      { at: 0, hz: 369.99, hold: 0.101, level: 0.88 },
      { at: 0.13, hz: 493.88, hold: 0.123, level: 0.8 },
      { at: 0.245, hz: 587.33, hold: 0.16, level: 0.75 },
      { at: 0.284, hz: 739.99, hold: 0.18, level: 0.59 },
    ], params.bloom, "glass");
  },
} satisfies SoundRecipe;
