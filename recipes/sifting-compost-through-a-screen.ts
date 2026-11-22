import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/backfill-furrow.ts';
import source2 from './_recordings/shake-soil-off-roots.ts';

export default {
  id: "sifting-compost-through-a-screen",
  name: "Sifting Compost through a Screen",
  category: "Farming",
  tags: ["sifting", "compost", "screen", "farm"],
  loopable: false,
  durationSec: 1.09,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .56, .65, 0, 9400],
      ['clip', source2, .2, .67, .6, 0, 7100],
      ["grains", "soil", .17, .64, .22, 1260, 18],
    ]);
  },
} satisfies SoundRecipe;
