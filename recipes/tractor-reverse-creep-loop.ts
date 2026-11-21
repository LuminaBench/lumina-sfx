import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-diesel-idle.ts';

export default {
  id: "tractor-reverse-creep-loop",
  name: "Tractor Reverse Creep",
  category: "Vehicles & Engines",
  tags: ["tractor", "reverse", "creep", "vehicle"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 275, edge: 730, drift: .20, density: 4.6, material: "rubber", texture: .35,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .80, 2.24, 3200, 0, 0],
      ["grains", "stone", .28, 8.5, .038, 387, 76],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
