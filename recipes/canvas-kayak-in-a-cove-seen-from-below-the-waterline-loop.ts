import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bow.ts';

export default {
  id: "canvas-kayak-in-a-cove-seen-from-below-the-waterline-loop",
  name: "Canvas Kayak in a Cove Seen from Below the Waterline",
  category: "Water & Fire",
  tags: ["canvas", "kayak", "cove", "seen", "below", "waterline"],
  loopable: true,
  durationSec: 8.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 310.7, edge: 997.4, drift: 0.22, density: 7, material: "water", texture: 0.36,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8.075, 0.63, 1.21, 1066, 0, 0],
      ["grains", "water", 0.19, 7.7, 0.059, 474.5, 36],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
