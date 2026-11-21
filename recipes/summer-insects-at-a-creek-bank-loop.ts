import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-brook-bed.ts';
import source2 from './_recordings/field-night-crickets.ts';

export default {
  id: "summer-insects-at-a-creek-bank-loop",
  name: "Summer Insects at a Creek Bank",
  category: "Weather & Ambience",
  tags: ["summer", "insects", "creek", "bank", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 450, edge: 2310, drift: .17, density: 7, material: "water", texture: .37,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .54, 1.76, 3900, 0, 0],
      ['clip', source2, 0, 14.075, .47, 2.30, 6200, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
