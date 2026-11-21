import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-air.ts';
import source2 from './_recordings/water-drops-from-spout.ts';

export default {
  id: "pond-surface-in-a-morning-breeze-loop",
  name: "Pond Surface in a Morning Breeze",
  category: "Weather & Ambience",
  tags: ["pond", "surface", "morning", "breeze", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -34,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 373, edge: 1450, drift: .22, density: 12.9, material: "water", texture: .48,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .44, 5.32, 4780, 0, 0],
      ['clip', source2, 7.94, .86, .07, .036, 3800, .09, .19],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
