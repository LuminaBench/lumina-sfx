import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';
import source2 from './_recordings/field-jar-turn.ts';

export default {
  id: "pulling-waxed-thread-through-leather",
  name: "Pulling Waxed Thread through Leather",
  category: "Props & Interactions",
  tags: ["pulling", "waxed", "thread", "leather"],
  loopable: false,
  durationSec: 0.73,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .65, .88, .027, 10600],
      ['clip', source2, .07, .46, .33, .019, 7100],
      ["brush", "cloth", .113, .51, .30, 1600, .032],
    ]);
  },
} satisfies SoundRecipe;
