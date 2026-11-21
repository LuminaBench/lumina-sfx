import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ocean.ts';

export default {
  id: "sailing-dinghy-across-the-bay-seen-from-below-the-waterline-loop",
  name: "Sailing Dinghy across the Bay Seen from Below the Waterline",
  category: "Water & Fire",
  tags: ["sailing", "dinghy", "across", "bay", "seen", "below", "waterline"],
  loopable: true,
  durationSec: 8.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 244.2, edge: 864.4, drift: 0.22, density: 7, material: "water", texture: 0.36,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8.075, 0.63, 1.21, 1131, 0, 0],
      ["grains", "water", 0.19, 7.7, 0.059, 247, 36],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
