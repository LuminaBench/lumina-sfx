import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-track-slow.ts';
import source2 from './_recordings/motion-workshop-slide.ts';

export default {
  id: "armored-crawler-brakes-and-hull-settles",
  name: "Armored crawler brakes and hull settles",
  category: "Vehicles & Engines",
  tags: ["armored", "crawler", "brakes", "hull", "settles", "tank", "tracked", "armoured", "vehicle"],
  loopable: false,
  durationSec: 2.42,
  targetRmsDbfs: -25.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.64, .71, .22, 3450, .005, .48],
      ['clip', source2, .27, 1.63, .40, .42, 4080, .12, .35],
      ["contact", "iron", 0, .064, .32, 410, .001],
      ["contact", "iron", 1.26, .29, .61, 110, .006],
      ["contact", "rubber", 1.77, .23, .52, 112, .005],
    ]);
  },
} satisfies SoundRecipe;
