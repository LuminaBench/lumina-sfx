import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-steady.ts';

export default {
  id: "piston-trainer-power-down",
  name: "Piston Trainer Power Down",
  category: "Aircraft",
  tags: ["piston", "trainer", "power", "down"],
  loopable: false,
  durationSec: 3.91,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.2, 0.46, 0.24, 1738, 0.024, 0.8],
      ["motor", 0.12, 2.42, 0.51, 108.81, 29.76, 0.09, 0.66],
      ["brush", "air", 0.17, 2.74, 0.23, 350, 0.073],
      ["contact", "rubber", 2.18, 0.31, 0.32, 177, 0.002],
    ]);
  },
} satisfies SoundRecipe;
