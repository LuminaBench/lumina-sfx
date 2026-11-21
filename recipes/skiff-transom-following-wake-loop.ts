import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-bow.ts';

export default {
  id: "skiff-transom-following-wake-loop",
  name: "Skiff transom following wake loop",
  category: "Water & Fire",
  tags: ["skiff", "transom", "following", "wake", "boat", "marine"],
  loopable: true,
  durationSec: 5.4,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 130, edge: 1260, drift: .35, density: 7, material: "wood", texture: .24,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.4, .64, .23, 3000, .06, .10],
      ["brush", "water", 1.04, .38, .28, 275, .017],
      ["brush", "water", 3.55, .48, .42, 222, .021],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
