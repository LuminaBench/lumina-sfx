import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-camera.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "camera-two-frame-burst",
  name: "Camera Two Frame Burst",
  category: "Props & Interactions",
  tags: ["camera", "two", "frame", "burst"],
  loopable: false,
  durationSec: 0.68,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .27, .80, 0, 11600],
      ['clip', source, .221, .41, .72, .05, 12500],
      ['clip', source2, .36, .29, .19, .051, 6600],
    ]);
  },
} satisfies SoundRecipe;
