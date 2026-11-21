import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/sneaker-pivot-squeak.ts';
import source2 from './_recordings/water-drops-from-spout.ts';

export default {
  id: "rubber-wiper-blade-lifting-off-glass",
  name: "Rubber Wiper Blade Lifting Off Glass",
  category: "Vehicles & Engines",
  tags: ["rubber", "wiper", "blade", "lifting", "glass", "vehicle"],
  loopable: false,
  durationSec: 0.87,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "rubber", 0, .074, .36, 540, .0008],
      ['clip', source, 0, .65, .54, .028, 9600],
      ['clip', source2, .21, .59, .27, .12, 8300],
      ["contact", "rubber", .14, .33, .45, 320, .004],
    ]);
  },
} satisfies SoundRecipe;
