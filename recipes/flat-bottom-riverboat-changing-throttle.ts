import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-flatboat-throttle.ts';

export default {
  id: "flat-bottom-riverboat-changing-throttle",
  name: "Flat-bottom riverboat changing throttle",
  category: "Water & Fire",
  tags: ["flat", "bottom", "riverboat", "changing", "throttle", "boat", "marine"],
  loopable: false,
  durationSec: 5.51,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.51, .9, .06, 4900, .003, .36],
      ["brush", "water", 0, .21, .15, 417, .003],
    ]);
  },
} satisfies SoundRecipe;
