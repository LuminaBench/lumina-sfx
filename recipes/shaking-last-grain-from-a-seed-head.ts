import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/bundle-dry-stalks.ts';
import source2 from './_recordings/plant-large-seeds.ts';

export default {
  id: "shaking-last-grain-from-a-seed-head",
  name: "Shaking Last Grain from a Seed Head",
  category: "Farming",
  tags: ["shaking", "last", "grain", "seed", "head", "farm", "wakefall"],
  loopable: false,
  durationSec: 0.62,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .53, .66, .085, 12300],
      ['clip', source2, .155, .35, .52, 0, 9200],
      ["grains", "plant", .24, .28, .15, 2440, 11],
    ]);
  },
} satisfies SoundRecipe;
