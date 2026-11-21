import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "narrow-sandstone-canyon-sheltered-nook-loop",
  name: "Narrow Sandstone Canyon Sheltered Nook",
  category: "Weather & Ambience",
  tags: ["narrow", "sandstone", "canyon", "sheltered", "nook", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 148.2, edge: 817.8, drift: 0.1554, density: 2.3, material: "stone", texture: 0.3,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.46, 1.75, 1198.5, 0, 0],
      ["grains", "stone", 0.45, 8.37, 0.061, 775.5, 31],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
