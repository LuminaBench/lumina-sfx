import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-air.ts';
import source2 from './_recordings/field-stalk-bed.ts';

export default {
  id: "open-pasture-at-first-frost-loop",
  name: "Open Pasture at First Frost",
  category: "Weather & Ambience",
  tags: ["open", "pasture", "first", "frost", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -34,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 280, edge: 1770, drift: .31, density: 2.68, material: "plant", texture: .38,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .71, 5.15, 6320, 0, 0],
      ['clip', source2, 2.6, 9.6, .21, 3.2, 6400, 1.2, 1.9],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
