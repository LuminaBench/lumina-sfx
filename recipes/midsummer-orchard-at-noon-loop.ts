import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-leaf-bed.ts';
import source2 from './_recordings/inside-beehive-loop.ts';

export default {
  id: "midsummer-orchard-at-noon-loop",
  name: "Midsummer Orchard at Noon",
  category: "Weather & Ambience",
  tags: ["midsummer", "orchard", "noon", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 530, edge: 2670, drift: .18, density: 3.72, material: "plant", texture: .66,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .64, .78, 7900, 0, 0],
      ['clip', source2, 3.55, 5.35, .095, 1.03, 3400, 1.2, 1.3],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
