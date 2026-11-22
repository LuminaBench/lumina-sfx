import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/milestone-snapwater.ts';
import recording2 from './_recordings/reviewed-motion-sailboat-cabin.ts';

export default {
  id: 'runabout-bow-lands-flat-off-wake', name: 'Runabout bow lands flat off wake', category: 'Vehicles & Engines',
  tags: ["vehicle", "runabout", "bow", "lands", "flat", "off", "wake", "wood", "foley"], loopable: false, durationSec: 1.1,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 1.04, 1.0, 0.07, 8400, 0.001, 0.09],
      ['clip', recording2, 0.015, 0.78, 0.51, 0.91, 760, 0.006, 0.09],
      ["contact", "wood", 0.015, 0.24, 0.2, 135, 0.003],
    ]);
  },
} satisfies SoundRecipe;
