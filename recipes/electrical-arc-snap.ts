import { arcDischarge } from "./_shared/arcade-energy.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "electrical-arc-snap", name: "Electrical Arc Snap", category: "Sci-Fi & UI",
  tags: ["electrical", "arc", "buzz", "spark"],
  loopable: false, durationSec: 0.59, targetRmsDbfs: -22,
  params: { density: { label: "Density", min: 0, max: 1, default: 0.54 } },
  render(ctx, { params }) {
    return arcDischarge(ctx, params.density, false);
  },
} satisfies SoundRecipe;
