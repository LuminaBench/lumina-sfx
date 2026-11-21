import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/tractor-diesel-pullaway.ts';

export default {
  id: "light-propeller-plane-pull-away",
  name: "Light Propeller Plane Pull-away",
  category: "Aircraft",
  tags: ["light", "propeller", "plane", "pull", "away"],
  loopable: false,
  durationSec: 4.2,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.95, .44, .125, 5000, .013, .21],
      ["motor", 0, 4.03, .41, 82, 152, .32, .53],
      ["brush", "air", .23, 3.62, .40, 1280, .47],
    ]);
  },
} satisfies SoundRecipe;
