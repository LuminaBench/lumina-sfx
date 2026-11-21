import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/car-cabin-idle-loop.ts';
import source2 from './_recordings/demo-turbine-idle.ts';

export default {
  id: "damped-muscle-car-cruise-loop",
  name: "Damped Muscle Car Cruise",
  category: "Vehicles & Engines",
  tags: ["damped", "muscle", "car", "cruise", "vehicle"],
  loopable: true,
  durationSec: 8.0,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 265, edge: 1270, drift: .22, density: 2.5, material: "air", texture: .18,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8.075, .54, .12, 1750, 0, 0],
      ['clip', source2, 0, 8.075, .12, .9, 360, 0, 0],
      ["motor", 0, 8.075, .03, 75, 74, .018, .47],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
