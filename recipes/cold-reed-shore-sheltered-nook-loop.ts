import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-marsh.ts';

export default {
  id: "cold-reed-shore-sheltered-nook-loop",
  name: "Cold Reed Shore Sheltered Nook",
  category: "Weather & Ambience",
  tags: ["cold", "reed", "shore", "sheltered", "nook", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 163.59, edge: 1200.6, drift: 0.1406, density: 2.3, material: "plant", texture: 0.3,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.46, 1.75, 1759.5, 0, 0],
      ["grains", "plant", 0.45, 8.37, 0.061, 1138.5, 31],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
