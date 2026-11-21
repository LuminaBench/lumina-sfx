import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-workshop-slide.ts';
import source2 from './_recordings/motion-chain-link.ts';

export default {
  id: "armored-drive-sprocket-under-strain",
  name: "Armored drive sprocket under strain",
  category: "Vehicles & Engines",
  tags: ["armored", "drive", "sprocket", "under", "strain", "tank", "tracked", "armoured", "vehicle"],
  loopable: false,
  durationSec: 2.13,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.10, .73, .11, 5300, .003, .20],
      ['clip', source2, .11, 1.95, .23, .13, 3150, .15, .19],
      ["motor", 0, 1.96, .19, 84, 107, .008, .64],
      ["contact", "iron", 0, .046, .28, 650, .0008],
    ]);
  },
} satisfies SoundRecipe;
