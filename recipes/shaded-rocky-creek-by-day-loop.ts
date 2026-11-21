import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-brook-bed.ts';
import source2 from './_recordings/milestone-bow.ts';

export default {
  id: "shaded-rocky-creek-by-day-loop",
  name: "Shaded Rocky Creek by Day",
  category: "Weather & Ambience",
  tags: ["shaded", "rocky", "creek", "day", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 740, edge: 3260, drift: 0.22, density: 6, material: "water", texture: 0.46,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.59, 0.61, 10106, 0, 0],
      ['clip', source2, 1.5, 7.2, 0.16, 0.46, 5607.2, 1.2, 1.1],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
