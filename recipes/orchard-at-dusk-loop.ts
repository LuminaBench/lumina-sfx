import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-night-crickets.ts';
import source2 from './_recordings/field-bird-canopy.ts';

export default {
  id: "orchard-at-dusk-loop",
  name: "Orchard at Dusk",
  category: "Weather & Ambience",
  tags: ["orchard", "dusk", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 340, edge: 1980, drift: .17, density: 2.31, material: "air", texture: .27,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .73, .38, 6800, 0, 0],
      ['clip', source2, 0, 14.075, .15, .89, 5500, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
