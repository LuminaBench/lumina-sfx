import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-stalk-bed.ts';

export default {
  id: "rustling-oat-field-loop",
  name: "Rustling Oat Field",
  category: "Weather & Ambience",
  tags: ["rustling", "oat", "field", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 315, edge: 2430, drift: .24, density: 4.2, material: "plant", texture: .55,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, 1, 1.07, 9500, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
