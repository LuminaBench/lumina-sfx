import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-air.ts';
import source2 from './_recordings/field-bird-canopy.ts';
import source3 from './_recordings/field-bird-flutter.ts';

export default {
  id: "swallows-above-a-farmyard-loop",
  name: "Swallows above a Farmyard",
  category: "Weather & Ambience",
  tags: ["swallows", "above", "farmyard", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 370, edge: 1680, drift: .21, density: 1.91, material: "air", texture: .28,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .66, 1.31, 9000, 0, 0],
      ['clip', source2, 1.68, 8.42, .32, 3.84, 7600, .7, 2.1],
      ['clip', source3, 7.82, 1.25, .09, .07, 5750, .062, .22],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
