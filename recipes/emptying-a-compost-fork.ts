import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/spade-turn-loam.ts';
import source2 from './_recordings/backfill-furrow.ts';
import source3 from './_recordings/bundle-dry-stalks.ts';

export default {
  id: "emptying-a-compost-fork",
  name: "Emptying a Compost Fork",
  category: "Farming",
  tags: ["emptying", "compost", "fork", "farm", "wakefall"],
  loopable: false,
  durationSec: 0.91,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .39, .52, .025, 6500],
      ['clip', source2, .095, .74, .83, 0, 9700],
      ['clip', source3, .24, .47, .30, .082, 6000],
    ]);
  },
} satisfies SoundRecipe;
