import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-brook-bed.ts';

export default {
  id: "shaded-rocky-creek-sheltered-nook-loop",
  name: "Shaded Rocky Creek Sheltered Nook",
  category: "Weather & Ambience",
  tags: ["shaded", "rocky", "creek", "sheltered", "nook", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 421.8, edge: 1890.8, drift: 0.1628, density: 2.3, material: "water", texture: 0.3,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.46, 1.75, 2771, 0, 0],
      ["grains", "water", 0.45, 8.37, 0.061, 1793, 31],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
