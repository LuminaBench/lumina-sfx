import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-jar-contact.ts';

export default {
  id: "tapping-a-jam-jar-lid",
  name: "Tapping a Jam Jar Lid",
  category: "Props & Interactions",
  tags: ["tapping", "jam", "jar", "lid"],
  loopable: false,
  durationSec: 0.46,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .40, .82, .075, 12300],
      ["contact", "iron", .026, .16, .24, 1230, .0007],
      ["contact", "glass", .054, .18, .20, 655, .001],
    ]);
  },
} satisfies SoundRecipe;
