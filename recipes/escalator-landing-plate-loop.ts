import { mix } from '../engine/dsp.ts';
import { atmosphere, scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "escalator-landing-plate-loop",
  name: "Escalator Landing Plate",
  category: "Vehicles & Engines",
  tags: ["escalator", "landing", "plate", "vehicle"],
  loopable: true,
  durationSec: 8.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 207, edge: 1510, drift: 0.28, density: 8, material: "iron", texture: 0.34,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["motor", 0, 8.075, 0.054, 53, 54, 0.03, 0.57],
      ["grains", "iron", 0.02, 7.8, 0.065, 338, 57],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
