import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bow.ts';

export default {
  id: "small-outboard-skiff-under-a-bridge-seen-from-below-the-waterline-loop",
  name: "Small Outboard Skiff under a Bridge Seen from Below the Waterline",
  category: "Water & Fire",
  tags: ["small", "outboard", "skiff", "under", "bridge", "seen", "below", "waterline"],
  loopable: true,
  durationSec: 8.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 268.9, edge: 913.8, drift: 0.22, density: 7, material: "water", texture: 0.36,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8.075, 0.63, 1.21, 1196, 0, 0],
      ["grains", "water", 0.19, 7.7, 0.059, 331.5, 36],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
