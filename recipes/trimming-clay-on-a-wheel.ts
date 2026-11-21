import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-pottery-wheel.ts';
import source2 from './_recordings/field-dough-roll.ts';
import source3 from './_recordings/field-butter-knife.ts';

export default {
  id: "trimming-clay-on-a-wheel",
  name: "Trimming Clay on a Wheel",
  category: "Props & Interactions",
  tags: ["trimming", "clay", "wheel"],
  loopable: false,
  durationSec: 1.84,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.69, .50, .40, 4650],
      ['clip', source2, .18, .88, .52, .145, 9800],
      ["brush", "soil", .28, .79, .27, 1350, .039],
      ['clip', source3, .87, .59, .32, .12, 6400],
    ]);
  },
} satisfies SoundRecipe;
