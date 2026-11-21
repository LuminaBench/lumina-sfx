import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-steady.ts';

export default {
  id: "coastal-floatplane-power-down",
  name: "Coastal Floatplane Power Down",
  category: "Aircraft",
  tags: ["coastal", "floatplane", "power", "down"],
  loopable: false,
  durationSec: 3.97,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.2, 0.46, 0.24, 1738, 0.024, 0.8],
      ["motor", 0.12, 2.42, 0.51, 136.89, 37.44, 0.09, 0.66],
      ["brush", "air", 0.17, 2.74, 0.23, 390, 0.073],
      ["contact", "rubber", 2.18, 0.31, 0.32, 179.6, 0.002],
    ]);
  },
} satisfies SoundRecipe;
