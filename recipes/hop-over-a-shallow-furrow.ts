import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/shovel-dry-earth.ts';
import source2 from './_recordings/loose-gravel-landing.ts';

export default {
  id: "hop-over-a-shallow-furrow",
  name: "Hop over a Shallow Furrow",
  category: "Footsteps & UI",
  tags: ["hop", "shallow", "furrow"],
  loopable: false,
  durationSec: 0.84,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .58, .57, .03, 6200],
      ["contact", "soil", .04, .22, .35, 352, .006],
      ['clip', source2, .28, .56, .56, .136, 7300],
    ]);
  },
} satisfies SoundRecipe;
