import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-tool.ts';
import source2 from './_recordings/motion-clank-close.ts';

export default {
  id: "modular-prop-insert-and-retention-click",
  name: "Modular prop insert and retention click",
  category: "Weapons",
  tags: ["modular", "prop", "insert", "retention", "click"],
  loopable: false,
  durationSec: 0.78,
  targetRmsDbfs: -26.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .63, .52, .12, 7200, .002, .13],
      ["brush", "iron", 0, .31, .34, 1090, .003],
      ["contact", "rubber", .296, .11, .37, 325, .002],
      ["contact", "iron", .415, .16, .64, 801, .0007],
      ['clip', source2, .425, .29, .54, .014, 9600, .003, .041],
    ]);
  },
} satisfies SoundRecipe;
