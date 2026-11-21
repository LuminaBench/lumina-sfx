import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "camera-grip-reposition",
  name: "Camera Grip Reposition",
  category: "Props & Interactions",
  tags: ["camera", "grip", "reposition"],
  loopable: false,
  durationSec: 0.74,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .63, .74, .05, 7200],
      ['clip', source2, .21, .49, .42, .029, 6600],
      ["contact", "rubber", .335, .28, .27, 300, .005],
    ]);
  },
} satisfies SoundRecipe;
