import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "scooter-center-stand-foot-and-return",
  name: "Scooter center stand foot and return",
  category: "Vehicles & Engines",
  tags: ["scooter", "center", "stand", "foot", "return", "vehicle"],
  loopable: false,
  durationSec: 0.73,
  targetRmsDbfs: -27.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .08, .56, 345, .0007],
      ['clip', source, .022, .27, .57, .023, 6500, .002, .047],
      ["contact", "iron", .24, .16, .56, 972, .0015],
      ["contact", "rubber", .42, .12, .21, 188, .003],
    ]);
  },
} satisfies SoundRecipe;
