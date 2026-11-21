import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-tire-skid-launch.ts';
import recording2 from './_recordings/car-bumper-bump.ts';

export default {
  id: 'dry-asphalt-slide-grips-at-corner-exit', name: 'Dry asphalt slide grips at corner exit', category: 'Vehicles & Engines',
  tags: ["vehicle", "dry", "asphalt", "slide", "grips", "at", "corner", "exit", "rubber", "foley"], loopable: false, durationSec: 1.38,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 1.32, 0.96, 0.38, 9400, 0.001, 0.09],
      ['clip', recording2, 0.97, 0.13, 0.3, 0.01, 650, 0.006, 0.0247],
      ["contact", "rubber", 1.06, 0.13, 0.24, 230, 0.003],
    ]);
  },
} satisfies SoundRecipe;
