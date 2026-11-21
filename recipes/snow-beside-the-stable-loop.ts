import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-air.ts';
import source2 from './_recordings/barn-timber-creak.ts';

export default {
  id: "snow-beside-the-stable-loop",
  name: "Snow beside the Stable",
  category: "Weather & Ambience",
  tags: ["snow", "beside", "stable", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -35,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 225, edge: 1400, drift: .29, density: 1.49, material: "wood", texture: .42,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .36, 4.24, 2450, 0, 0],
      ['clip', source2, 7.26, 1.1, .10, .13, 3500, .20, .32],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
