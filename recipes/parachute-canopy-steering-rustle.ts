import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-tent-tension.ts';
import source2 from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "parachute-canopy-steering-rustle",
  name: "Parachute Canopy Steering Rustle",
  category: "Weather & Ambience",
  tags: ["parachute", "canopy", "steering", "rustle", "ambience"],
  loopable: false,
  durationSec: 1.65,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.58, .78, .27, 7350],
      ['clip', source2, .15, 1.4, .43, .19, 8100, .02, .17],
      ["brush", "cloth", .47, 1, .24, 820, .16],
    ]);
  },
} satisfies SoundRecipe;
