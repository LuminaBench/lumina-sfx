import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/tractor-diesel-pullaway.ts';
import source2 from './_recordings/field-diesel-idle.ts';

export default {
  id: "tractor-maneuvering-past-a-barn",
  name: "Tractor Maneuvering Past a Barn",
  category: "Vehicles & Engines",
  tags: ["tractor", "maneuvering", "past", "barn", "vehicle"],
  loopable: false,
  durationSec: 3.83,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.7, .71, .062, 3700, .06, .28],
      ['clip', source2, .31, 3.3, .25, 2.49, 1500, .37, .46],
      ["brush", "soil", .3, 2.78, .28, 410, .43],
    ]);
  },
} satisfies SoundRecipe;
