import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-dirt-road-pass.ts';
import recording2 from './_recordings/loose-gravel-landing.ts';

export default {
  id: 'gravel-handbrake-slide-scattering-stones', name: 'Gravel handbrake slide scattering stones', category: 'Vehicles & Engines',
  tags: ["vehicle", "gravel", "handbrake", "slide", "scattering", "stones", "stone", "foley"], loopable: false, durationSec: 1.25,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 1.19, 0.87, 0.82, 9900, 0.001, 0.09],
      ['clip', recording2, 0.14, 0.36, 0.67, 0.01, 8700, 0.006, 0.0684],
      ["grains", "stone", 0.45, 0.73, 0.38, 1440, 14],
    ]);
  },
} satisfies SoundRecipe;
