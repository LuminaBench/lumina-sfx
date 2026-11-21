import { mix } from '../engine/dsp.ts';
import { atmosphere, scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "prism-repeater-capacitor-charge-loop",
  name: "Prism repeater capacitor charge loop",
  category: "Weapons",
  tags: ["prism", "repeater", "capacitor", "charge"],
  loopable: true,
  durationSec: 2.87,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 104, edge: 1990, drift: .63, density: 8, material: "air", texture: .11,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ["motor", 0, 2.87, .37, 83, 89, .12, .9],
      ["tone", 0, 2.87, .23, 216, 228, .21, .57],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
