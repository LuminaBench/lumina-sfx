import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-marsh.ts';
import source2 from './_recordings/field-brook-bed.ts';

export default {
  id: "cold-reed-shore-by-day-loop",
  name: "Cold Reed Shore by Day",
  category: "Weather & Ambience",
  tags: ["cold", "reed", "shore", "day", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 287, edge: 2070, drift: 0.19, density: 6, material: "plant", texture: 0.46,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.59, 0.61, 6417, 0, 0],
      ['clip', source2, 1.5, 7.2, 0.16, 0.46, 3560.4, 1.2, 1.1],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
