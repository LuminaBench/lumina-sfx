import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/barn-timber-creak.ts';

export default {
  id: "wind-pumping-a-loose-shutter-loop",
  name: "Wind Pumping a Loose Shutter",
  category: "Weather & Ambience",
  tags: ["wind", "pumping", "loose", "shutter", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 260, edge: 1430, drift: .29, density: 1.7, material: "air", texture: .4,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 2.08, .99, .12, 0, 3890, .095, .22],
      ["contact", "wood", 2.99, .26, .27, 370, .003],
      ["contact", "wood", 5.37, .25, .15, 488, .001],
      ["contact", "wood", 5.86, .14, .20, 319, .001],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
