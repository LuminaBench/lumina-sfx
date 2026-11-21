import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-hydraulic-start.ts';

export default {
  id: "armored-elevation-motor-free-play",
  name: "Armored elevation motor free play",
  category: "Vehicles & Engines",
  tags: ["armored", "elevation", "motor", "free", "play", "tank", "tracked", "armoured", "vehicle"],
  loopable: false,
  durationSec: 1.88,
  targetRmsDbfs: -27.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.55, .55, .018, 3900, .006, .18],
      ["contact", "iron", 0, .063, .55, 670, .0015],
      ["motor", .052, 1.53, .29, 92, 113, .04, .65],
      ["contact", "iron", 1.53, .17, .59, 627, .001],
      ["grains", "iron", 1.59, .21, .18, 960, 3],
    ]);
  },
} satisfies SoundRecipe;
