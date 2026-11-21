import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "armored-track-tensioner-snaps-once",
  name: "Armored track tensioner snaps once",
  category: "Vehicles & Engines",
  tags: ["armored", "track", "tensioner", "snaps", "once", "tank", "tracked", "armoured", "vehicle"],
  loopable: false,
  durationSec: 0.69,
  targetRmsDbfs: -26.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .285, .65, .022, 10100, .002, .04],
      ["contact", "iron", 0, .154, .72, 683, .00052],
      ["contact", "iron", .165, .115, .35, 1440, .0008],
      ["contact", "wood", .36, .11, .21, 228, .0025],
    ]);
  },
} satisfies SoundRecipe;
