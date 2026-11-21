import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-dough-roll.ts';
import source2 from './_recordings/leather-strap-flex.ts';

export default {
  id: "kneading-dough-on-a-board",
  name: "Kneading Dough on a Board",
  category: "Props & Interactions",
  tags: ["kneading", "dough", "board"],
  loopable: false,
  durationSec: 1.41,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.30, .86, 0, 8500],
      ['clip', source2, .05, .52, .30, .07, 4550],
      ["contact", "rubber", .74, .31, .34, 240, .005],
    ]);
  },
} satisfies SoundRecipe;
