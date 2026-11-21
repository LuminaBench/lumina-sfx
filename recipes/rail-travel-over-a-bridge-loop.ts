import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-rail-joints.ts';

export default {
  id: "rail-travel-over-a-bridge-loop",
  name: "Rail Travel over a Bridge",
  category: "Vehicles & Engines",
  tags: ["rail", "travel", "bridge", "vehicle"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 224, edge: 870, drift: .27, density: 2.5, material: "wood", texture: .28,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .68, 3.70, 4090, 0, 0],
      ["grains", "wood", 1.3, 7.5, .085, 245, 31],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
