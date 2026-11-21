import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-dough-roll.ts';

export default {
  id: "pushing-dough-through-a-roller",
  name: "Pushing Dough through a Roller",
  category: "Props & Interactions",
  tags: ["pushing", "dough", "roller"],
  loopable: false,
  durationSec: 1.27,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.18, 1, .17, 7300],
      ["brush", "wood", .29, .65, .30, 520, .091],
      ["contact", "wood", .66, .23, .33, 262, .005],
    ]);
  },
} satisfies SoundRecipe;
