import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/shallow-water-footstep.ts';
import source2 from './_recordings/mud-squelch-footstep.ts';

export default {
  id: "rubber-boot-in-shallow-ditch",
  name: "Rubber Boot in Shallow Ditch",
  category: "Footsteps & UI",
  tags: ["rubber", "boot", "shallow", "ditch"],
  loopable: false,
  durationSec: 0.84,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .65, .74, .02, 9800],
      ['clip', source2, .16, .61, .60, .08, 6950],
      ["brush", "water", .45, .32, .23, 800, .031],
    ]);
  },
} satisfies SoundRecipe;
