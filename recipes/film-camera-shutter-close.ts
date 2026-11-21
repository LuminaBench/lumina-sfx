import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-camera.ts';

export default {
  id: "film-camera-shutter-close",
  name: "Film Camera Shutter Close",
  category: "Props & Interactions",
  tags: ["film", "camera", "shutter", "close"],
  loopable: false,
  durationSec: 0.65,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .46, .94, 0, 13200],
      ["contact", "rubber", .04, .23, .18, 302, .002],
    ]);
  },
} satisfies SoundRecipe;
