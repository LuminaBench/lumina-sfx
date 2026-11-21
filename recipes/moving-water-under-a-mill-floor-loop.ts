import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-brook-bed.ts';
import source2 from './_recordings/field-pottery-wheel.ts';

export default {
  id: "moving-water-under-a-mill-floor-loop",
  name: "Moving Water under a Mill Floor",
  category: "Weather & Ambience",
  tags: ["moving", "water", "under", "mill", "floor", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 490, edge: 1150, drift: .28, density: 7, material: "water", texture: .39,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .78, .1, 1610, 0, 0],
      ['clip', source2, 3.43, 2.52, .095, .31, 1190, .7, 1],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
