import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/spade-wet-mud.ts';
import source2 from './_recordings/field-dough-roll.ts';

export default {
  id: "mortar-trowel-smear",
  name: "Mortar Trowel Smear",
  category: "Impacts",
  tags: ["mortar", "trowel", "smear"],
  loopable: false,
  durationSec: 0.8,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .60, .81, .06, 5810],
      ['clip', source2, .03, .62, .32, .31, 4420],
      ["brush", "stone", .26, .39, .30, 1200, .073],
    ]);
  },
} satisfies SoundRecipe;
