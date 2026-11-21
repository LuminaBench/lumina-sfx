import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-chain-scrape.ts';

export default {
  id: "parking-lot-scrape",
  name: "Parking lot scrape",
  category: "Vehicles & Engines",
  tags: ["parking", "lot", "scrape", "vehicle"],
  loopable: false,
  durationSec: 1.48,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.42, .71, .29, 7300, .007, .21],
      ["brush", "iron", 0, 1.26, .55, 1400, .013],
      ["contact", "rubber", .84, .18, .28, 272, .003],
      ["contact", "iron", 1.07, .24, .61, 575, .001],
    ]);
  },
} satisfies SoundRecipe;
