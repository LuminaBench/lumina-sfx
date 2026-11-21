import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/dry-leaves-footstep.ts';

export default {
  id: "sailplane-wheel-touch-on-grass",
  name: "Sailplane Wheel Touch on Grass",
  category: "Aircraft",
  tags: ["sailplane", "wheel", "touch", "grass"],
  loopable: false,
  durationSec: 2.02,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.43, 0.67, 0, 4300, 0.007, 0.08],
      ["contact", "rubber", 0.045, 0.31, 0.51, 218, 0.002],
      ["grains", "soil", 0.11, 1.4, 0.39, 510, 21],
      ["brush", "air", 0.25, 1.4, 0.48, 940, 0.06],
    ]);
  },
} satisfies SoundRecipe;
