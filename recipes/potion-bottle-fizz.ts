import { potionFizz } from "./_shared/game-magic.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "potion-bottle-fizz", name: "Potion Bottle Fizz", category: "Sci-Fi & UI",
  tags: ["potion", "fizz", "bubbles", "alchemy", "liquid"],
  loopable: false, durationSec: 0.66, targetRmsDbfs: -24,
  params: { activity: { label: "Activity", min: 0, max: 1, default: 0.51 } },
  render(ctx, { params }) {
    return potionFizz(ctx, params.activity);
  },
} satisfies SoundRecipe;
