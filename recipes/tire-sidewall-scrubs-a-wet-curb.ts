import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-wet-asphalt-pass.ts';
import recording2 from './_recordings/car-sideswipe-scrape.ts';

export default {
  id: 'tire-sidewall-scrubs-a-wet-curb', name: 'Tire sidewall scrubs a wet curb', category: 'Vehicles & Engines',
  tags: ["vehicle", "tire", "sidewall", "scrubs", "a", "wet", "curb", "rubber", "foley"], loopable: false, durationSec: 0.64,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.56, 0.72, 1.09, 7100, 0.001, 0.09],
      ['clip', recording2, 0.21, 0.37, 0.48, 0.12, 3400, 0.006, 0.0703],
      ["contact", "rubber", 0.18, 0.15, 0.37, 280, 0.003],
    ]);
  },
} satisfies SoundRecipe;
