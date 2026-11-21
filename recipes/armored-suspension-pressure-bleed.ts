import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-hydraulic-start.ts';

export default {
  id: "armored-suspension-pressure-bleed",
  name: "Armored suspension pressure bleed",
  category: "Vehicles & Engines",
  tags: ["armored", "suspension", "pressure", "bleed", "tank", "tracked", "armoured", "vehicle"],
  loopable: false,
  durationSec: 1.77,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.43, .68, .07, 5300, .005, .38],
      ["contact", "iron", 0, .063, .43, 288, .0009],
      ["brush", "air", .11, 1.21, .45, 1990, .024],
      ["contact", "iron", 1.04, .25, .60, 172, .004],
      ["contact", "rubber", 1.34, .19, .29, 111, .003],
    ]);
  },
} satisfies SoundRecipe;
