import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bow.ts';

export default {
  id: "rowboat-at-reed-bank-seen-from-below-the-waterline-loop",
  name: "Rowboat at Reed Bank Seen from Below the Waterline",
  category: "Water & Fire",
  tags: ["rowboat", "reed", "bank", "seen", "below", "waterline"],
  loopable: true,
  durationSec: 8.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 259.4, edge: 894.8, drift: 0.22, density: 7, material: "water", texture: 0.36,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8.075, 0.63, 1.21, 832, 0, 0],
      ["grains", "water", 0.19, 7.7, 0.059, 299, 36],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
