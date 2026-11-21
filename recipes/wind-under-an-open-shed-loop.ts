import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-air.ts';

export default {
  id: "wind-under-an-open-shed-loop",
  name: "Wind under an Open Shed",
  category: "Weather & Ambience",
  tags: ["wind", "under", "an", "open", "shed", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 205, edge: 711, drift: .37, density: 1.92, material: "air", texture: .43,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .54, 1.7, 2010, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
