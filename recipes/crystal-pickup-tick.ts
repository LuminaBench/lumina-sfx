import { runeChime } from "./_shared/game-magic.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "crystal-pickup-tick", name: "Crystal Pickup Tick", category: "Sci-Fi & UI",
  tags: ["gem", "crystal", "pickup", "rewards"],
  loopable: false, durationSec: 0.34, targetRmsDbfs: -23,
  params: { bloom: { label: "Bloom", min: 0, max: 1, default: 0.58 } },
  render(ctx, { params }) {
    return runeChime(ctx, [
      { at: 0, hz: 698, hold: 0.054, level: 1 },
      { at: 0.062, hz: 1175, hold: 0.043, level: 0.54 },
    ], params.bloom, "glass");
  },
} satisfies SoundRecipe;
