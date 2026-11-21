import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/barn-timber-creak.ts';
import source2 from './_recordings/field-dough-roll.ts';

export default {
  id: "pressing-curds-in-a-mold",
  name: "Pressing Curds in a Mold",
  category: "Props & Interactions",
  tags: ["pressing", "curds", "mold"],
  loopable: false,
  durationSec: 1.41,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .98, .65, .025, 6300],
      ['clip', source2, .25, .70, .57, .21, 4950],
      ["contact", "rubber", .70, .38, .34, 255, .024],
    ]);
  },
} satisfies SoundRecipe;
