import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import recording1 from './_recordings/car-sideswipe-scrape.ts';
import recording2 from './_recordings/car-bumper-bump.ts';

export default {
  id: 'fender-scrape-followed-by-mirror-strike', name: 'Fender scrape followed by mirror strike', category: 'Vehicles & Engines',
  tags: ["vehicle", "fender", "scrape", "followed", "by", "mirror", "strike", "glass", "foley"], loopable: false, durationSec: 0.88,
  mixRole: 'vehicle', targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },
  ...sceneCredits(recording1, recording2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', recording1, 0.0, 0.73, 0.93, 0.02, 7900, 0.001, 0.09],
      ['clip', recording2, 0.49, 0.17, 0.78, 0.008, 6800, 0.006, 0.0323],
      ["grains", "glass", 0.55, 0.27, 0.21, 2400, 8],
    ]);
  },
} satisfies SoundRecipe;
