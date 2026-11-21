import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hardwood-footstep.ts';

export default {
  id: "bare-foot-on-dry-farm-boards",
  name: "Bare Foot on Dry Farm Boards",
  category: "Footsteps & UI",
  tags: ["bare", "foot", "dry", "farm", "boards"],
  loopable: false,
  durationSec: 0.59,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .44, .63, .073, 4900],
      ["contact", "wood", .05, .22, .25, 285, .004],
      ["brush", "cloth", .114, .31, .22, 734, .043],
    ]);
  },
} satisfies SoundRecipe;
