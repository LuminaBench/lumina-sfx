import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-hen-feed.ts';
import source2 from './_recordings/plant-large-seeds.ts';

export default {
  id: "hen-pecking-grain",
  name: "Hen Pecking Grain",
  category: "Animals",
  tags: ["hen", "pecking", "grain", "livestock"],
  loopable: false,
  durationSec: 1.07,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .74, .70, .04, 10600],
      ['clip', source2, .095, .47, .36, .075, 8300],
      ["grains", "stone", .09, .54, .15, 2870, 11],
    ]);
  },
} satisfies SoundRecipe;
