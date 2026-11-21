import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/rock-pile-impact.ts';
import source2 from './_recordings/shovel-dry-earth.ts';

export default {
  id: "millstone-first-turn",
  name: "Millstone First Turn",
  category: "Props & Interactions",
  tags: ["millstone", "first", "turn"],
  loopable: false,
  durationSec: 1.33,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .22, .36, .005, 4500],
      ['clip', source2, .082, 1, .79, .07, 5400],
      ["contact", "wood", .13, .20, .51, 265, .004],
      ["brush", "stone", .234, .88, .38, 640, .095],
    ]);
  },
} satisfies SoundRecipe;
