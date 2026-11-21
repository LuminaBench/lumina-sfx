import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/dry-branch-snap.ts';
import source2 from './_recordings/bundle-dry-stalks.ts';

export default {
  id: "birch-kindling-splitting",
  name: "Birch Kindling Splitting",
  category: "Impacts",
  tags: ["birch", "kindling", "splitting"],
  loopable: false,
  durationSec: 0.6,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .46, .93, .015, 12700],
      ['clip', source2, .084, .42, .26, .12, 7000],
    ]);
  },
} satisfies SoundRecipe;
