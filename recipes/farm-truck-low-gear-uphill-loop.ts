import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-diesel-idle.ts';
import source2 from './_recordings/diesel-truck-idle-loop.ts';

export default {
  id: "farm-truck-low-gear-uphill-loop",
  name: "Farm Truck Low Gear Uphill",
  category: "Vehicles & Engines",
  tags: ["farm", "truck", "low", "gear", "uphill", "vehicle"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 242, edge: 979, drift: .31, density: 7.3, material: "rubber", texture: .36,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .74, 3.27, 3100, 0, 0],
      ['clip', source2, 0, 9.075, .29, .08, 4230, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
