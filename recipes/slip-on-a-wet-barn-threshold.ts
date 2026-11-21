import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/sneaker-pivot-squeak.ts';
import source2 from './_recordings/shallow-water-footstep.ts';
import source3 from './_recordings/wood-platform-landing.ts';

export default {
  id: "slip-on-a-wet-barn-threshold",
  name: "Slip on a Wet Barn Threshold",
  category: "Footsteps & UI",
  tags: ["slip", "wet", "barn", "threshold"],
  loopable: false,
  durationSec: 0.95,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .65, .65, .02, 7500],
      ['clip', source2, .095, .65, .48, .020, 6500],
      ['clip', source3, .37, .51, .67, .045, 5100],
    ]);
  },
} satisfies SoundRecipe;
