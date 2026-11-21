import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ocean.ts';

export default {
  id: "windward-headland-sheltered-nook-loop",
  name: "Windward Headland Sheltered Nook",
  category: "Weather & Ambience",
  tags: ["windward", "headland", "sheltered", "nook", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 282.15, edge: 1496.4, drift: 0.2368, density: 2.3, material: "stone", texture: 0.3,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.46, 1.75, 2193, 0, 0],
      ["grains", "stone", 0.45, 8.37, 0.061, 1419, 31],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
