import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/action-lever-cycle.ts';
import source2 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "closing-an-iron-stove-damper",
  name: "Closing an Iron Stove Damper",
  category: "Props & Interactions",
  tags: ["closing", "an", "iron", "stove", "damper"],
  loopable: false,
  durationSec: 0.78,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .58, .57, .018, 6900],
      ['clip', source2, .128, .59, .72, .07, 6150],
      ["contact", "iron", .375, .24, .31, 290, .0014],
    ]);
  },
} satisfies SoundRecipe;
