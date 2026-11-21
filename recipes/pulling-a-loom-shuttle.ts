import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/wooden-drawer-open.ts';
import source2 from './_recordings/leather-strap-flex.ts';

export default {
  id: "pulling-a-loom-shuttle",
  name: "Pulling a Loom Shuttle",
  category: "Props & Interactions",
  tags: ["pulling", "loom", "shuttle"],
  loopable: false,
  durationSec: 0.81,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .65, .80, .018, 8500],
      ['clip', source2, .047, .41, .39, .045, 6700],
      ["contact", "wood", .36, .20, .51, 476, .001],
    ]);
  },
} satisfies SoundRecipe;
