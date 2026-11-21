import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-prop-steady.ts';

export default {
  id: "coastal-floatplane-at-low-power-loop",
  name: "Coastal Floatplane at Low Power",
  category: "Aircraft",
  tags: ["coastal", "floatplane", "low", "power"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 198.4, edge: 897, drift: 0.248, density: 2, material: "air", texture: 0.14,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, 0.65, 0.18, 2200, 0, 0],
      ["motor", 0, 9.075, 0.053, 117, 116.766, 0.025, 0.61],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
