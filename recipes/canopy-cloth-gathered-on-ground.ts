import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-tent-tension.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "canopy-cloth-gathered-on-ground",
  name: "Canopy Cloth Gathered on Ground",
  category: "Weather & Ambience",
  tags: ["canopy", "cloth", "gathered", "ground", "ambience"],
  loopable: false,
  durationSec: 1.43,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.31, .84, .11, 7500],
      ['clip', source2, .39, .93, .36, .08, 6200],
      ["brush", "cloth", .68, .60, .21, 483, .12],
    ]);
  },
} satisfies SoundRecipe;
