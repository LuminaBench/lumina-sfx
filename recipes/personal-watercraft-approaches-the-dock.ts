import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-jet-water-approach.ts';

export default {
  id: "personal-watercraft-approaches-the-dock",
  name: "Personal watercraft approaches the dock",
  category: "Water & Fire",
  tags: ["personal", "watercraft", "approaches", "dock", "boat", "marine"],
  loopable: false,
  durationSec: 4.62,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.62, 1, .03, 8400, .004, .31],
    ]);
  },
} satisfies SoundRecipe;
