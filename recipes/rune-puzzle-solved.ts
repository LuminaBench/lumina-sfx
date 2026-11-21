import { runeChime } from "./_shared/game-magic.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "rune-puzzle-solved", name: "Rune Puzzle Solved", category: "Sci-Fi & UI",
  tags: ["rune", "puzzle", "solve", "altar", "magic", "chime"],
  loopable: false, durationSec: 0.83, targetRmsDbfs: -23,
  params: { bloom: { label: "Bloom", min: 0, max: 1, default: 0.58 } },
  render(ctx, { params }) {
    return runeChime(ctx, [
      { at: 0, hz: 781.8, hold: 0.035, level: 0.66 },
      { at: 0.045, hz: 659.3, hold: 0.053, level: 0.75 },
      { at: 0.162, hz: 435.2, hold: 0.109, level: 0.83 },
      { at: 0.169, hz: 652.8, hold: 0.145, level: 0.84 },
      { at: 0.215, hz: 870.4, hold: 0.157, level: 0.61 },
    ], params.bloom, "glass");
  },
} satisfies SoundRecipe;
