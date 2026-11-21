import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-diesel-idle.ts';
import source2 from './_recordings/field-wet-road.ts';

export default {
  id: "road-vehicle-rolling-onto-wooden-bridge-loop",
  name: "Road Vehicle Rolling onto Wooden Bridge",
  category: "Vehicles & Engines",
  tags: ["road", "vehicle", "rolling", "wooden", "bridge"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 330, edge: 920, drift: .39, density: 9.0, material: "wood", texture: .39,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .51, .14, 2970, 0, 0],
      ["grains", "wood", .009, 8.86, .073, 255, 63],
      ['clip', source2, 4.3, 3.0, .15, .62, 4800, .55, .55],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
