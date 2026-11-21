import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-corn-rustle.ts';

export default {
  id: "alpine-treeline-sheltered-nook-loop",
  name: "Alpine Treeline Sheltered Nook",
  category: "Weather & Ambience",
  tags: ["alpine", "treeline", "sheltered", "nook", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 182.4, edge: 1299.2, drift: 0.1184, density: 2.3, material: "plant", texture: 0.3,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.46, 1.75, 1904, 0, 0],
      ["grains", "plant", 0.45, 8.37, 0.061, 1232, 31],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
