import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-canopy-rustle.ts';

export default {
  id: "practice-net-ball-falls-from-mesh",
  name: "Practice Net Ball Falls from Mesh",
  category: "Impacts",
  tags: ["practice", "net", "ball", "falls", "mesh"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.46, 0.61, 0.04, 6800, 0.007, 0.08],
      ["contact", "cloth", 0.035, 0.23, 0.54, 366.03, 0.002],
      ['clip', source, 0.37, 0.76, 0.52, 0.19, 5304, 0.007, 0.08],
      ["contact", "cloth", 0.56, 0.27, 0.34, 507.15, 0.002],
      ["grains", "cloth", 0.61, 0.5, 0.19, 882, 12],
    ]);
  },
} satisfies SoundRecipe;
