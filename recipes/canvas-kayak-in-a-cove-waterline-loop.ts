import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bow.ts';
import source2 from './_recordings/milestone-oar.ts';

export default {
  id: "canvas-kayak-in-a-cove-waterline-loop",
  name: "Canvas Kayak in a Cove Waterline",
  category: "Water & Fire",
  tags: ["canvas", "kayak", "cove", "waterline"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 532.9, edge: 2624, drift: 0.25, density: 9, material: "water", texture: 0.42,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, 0.56, 0.8, 3690, 0, 0],
      ['clip', source2, 3.1, 2.3, 0.11, 0.09, 2993, 0.49, 0.8],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
