import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-diesel-idle.ts';

export default {
  id: "tractor-idling-from-inside-the-cab-loop",
  name: "Tractor Idling from Inside the Cab",
  category: "Vehicles & Engines",
  tags: ["tractor", "idling", "inside", "cab", "vehicle"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 208, edge: 705, drift: .26, density: 5.4, material: "wood", texture: .15,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .98, .43, 1100, 0, 0],
      ["grains", "wood", .2, 8.4, .022, 158, 65],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
