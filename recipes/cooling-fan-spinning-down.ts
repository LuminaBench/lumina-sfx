import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "cooling-fan-spinning-down",
  name: "Cooling Fan Spinning Down",
  category: "Sci-Fi & UI",
  tags: ["cooling", "fan", "spinning", "down"],
  loopable: false,
  durationSec: 2.96,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 2.90, .79, 948, .058],
      ["motor", 0, 2.86, .18, 165, 39, .038, .73],
      ["grains", "rubber", 1.37, 1.38, .08, 476, 12],
    ]);
  },
} satisfies SoundRecipe;
