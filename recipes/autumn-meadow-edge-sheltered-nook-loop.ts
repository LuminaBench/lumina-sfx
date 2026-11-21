import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-stalk-bed.ts';

export default {
  id: "autumn-meadow-edge-sheltered-nook-loop",
  name: "Autumn Meadow Edge Sheltered Nook",
  category: "Weather & Ambience",
  tags: ["autumn", "meadow", "edge", "sheltered", "nook", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 205.2, edge: 1363, drift: 0.0962, density: 2.3, material: "plant", texture: 0.3,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.46, 1.75, 1997.5, 0, 0],
      ["grains", "plant", 0.45, 8.37, 0.061, 1292.5, 31],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
