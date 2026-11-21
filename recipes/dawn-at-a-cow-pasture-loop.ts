import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-countryside-bed.ts';
import source2 from './_recordings/cow-moo.ts';
import source3 from './_recordings/field-farm-cow.ts';

export default {
  id: "dawn-at-a-cow-pasture-loop",
  name: "Dawn at a Cow Pasture",
  category: "Weather & Ambience",
  tags: ["dawn", "cow", "pasture", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 380, edge: 1350, drift: .14, density: 1.53, material: "plant", texture: .31,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .68, 1.23, 8200, 0, 0],
      ['clip', source2, 2.82, 1.7, .13, .06, 2130, .054, .18],
      ['clip', source3, 8.58, 1.23, .10, .09, 2100, .075, .14],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
