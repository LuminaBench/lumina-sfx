import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/barn-timber-creak.ts';
import source2 from './_recordings/field-farm-air.ts';

export default {
  id: "empty-stable-in-a-light-wind-loop",
  name: "Empty Stable in a Light Wind",
  category: "Weather & Ambience",
  tags: ["empty", "stable", "light", "wind", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -34,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 190, edge: 1000, drift: .40, density: 2.23, material: "wood", texture: .32,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 3.18, 1.22, .12, .04, 4340, .14, .30],
      ['clip', source2, 0, 14.075, .22, 2.52, 2100, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
