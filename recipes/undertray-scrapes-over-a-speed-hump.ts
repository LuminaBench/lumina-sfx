import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-sideswipe-scrape.ts';
import recording2 from './_recordings/car-dirt-road-pass.ts';

export default {
  id: 'undertray-scrapes-over-a-speed-hump', name: 'Undertray scrapes over a speed hump', category: 'Vehicles & Engines',
  tags: ["vehicle", "undertray", "scrapes", "over", "a", "speed", "hump", "rubber", "foley"], loopable: false, durationSec: 0.87,
  mixRole: 'vehicle', targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.64, 0.84, 0.17, 4500, 0.001, 0.09],
      ['clip', recording2, 0.16, 0.65, 0.43, 1.45, 3400, 0.006, 0.09],
      ["contact", "rubber", 0.52, 0.14, 0.25, 188, 0.003],
    ]);
  },
} satisfies SoundRecipe;
