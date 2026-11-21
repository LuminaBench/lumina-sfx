import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/irrigation-valve-open.ts';

export default {
  id: "habitat-airlock-pressure-equalize",
  name: "Habitat Airlock Pressure Equalize",
  category: "Sci-Fi & UI",
  tags: ["habitat", "airlock", "pressure", "equalize"],
  loopable: false,
  durationSec: 1.42,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .18, .51, 900, .001],
      ["brush", "air", .091, 1.27, .86, 2250, .067],
      ['clip', source, .15, .61, .19, .32, 5600, 0.10, .17],
      ["brush", "air", .41, .94, .49, 1060, .12],
    ]);
  },
} satisfies SoundRecipe;
