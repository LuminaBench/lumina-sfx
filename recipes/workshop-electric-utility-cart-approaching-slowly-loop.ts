import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ev-surface.ts';

export default {
  id: "workshop-electric-utility-cart-approaching-slowly-loop",
  name: "Workshop Electric Utility Cart Approaching Slowly",
  category: "Vehicles & Engines",
  tags: ["workshop", "electric", "utility", "cart", "approaching", "slowly", "vehicle"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 245, edge: 2108, drift: 0.21, density: 8, material: "stone", texture: 0.27,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, 0.59, 0.4, 3400, 0, 0],
      ["motor", 0, 9.075, 0.031, 143, 142.857, 0.035, 0.42],
      ["grains", "stone", 0.08, 8.4, 0.11, 650, 60],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
