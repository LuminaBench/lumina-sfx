import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-stalk-bed.ts';
import source2 from './_recordings/field-countryside-bed.ts';

export default {
  id: "autumn-meadow-edge-by-day-loop",
  name: "Autumn Meadow Edge by Day",
  category: "Weather & Ambience",
  tags: ["autumn", "meadow", "edge", "day", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 360, edge: 2350, drift: 0.13, density: 6, material: "plant", texture: 0.46,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.59, 0.61, 7285, 0, 0],
      ['clip', source2, 1.5, 7.2, 0.16, 0.46, 4042, 1.2, 1.1],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
