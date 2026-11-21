import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-calf-contact.ts';
import source2 from './_recordings/field-farm-cow.ts';

export default {
  id: "calf-calling-under-a-barn-roof",
  name: "Calf Calling under a Barn Roof",
  category: "Animals",
  tags: ["calf", "calling", "under", "barn", "roof", "livestock"],
  loopable: false,
  durationSec: 1.66,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.55, .61, .02, 8000],
      ['clip', source2, .12, 1.30, .62, .006, 8500, .013, .09],
      ['clip', source2, .174, 1.18, .13, .017, 2800],
    ]);
  },
} satisfies SoundRecipe;
