import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hardwood-footstep.ts';
import source2 from './_recordings/metal-pail-pour.ts';
import source3 from './_recordings/field-milk-pour.ts';

export default {
  id: "walking-shift-with-a-full-pail",
  name: "Walking Shift with a Full Pail",
  category: "Footsteps & UI",
  tags: ["walking", "shift", "full", "pail"],
  loopable: false,
  durationSec: 0.95,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .44, .64, .041, 5800],
      ['clip', source2, .087, .8, .57, .32, 6100],
      ['clip', source3, .24, .58, .29, .2, 5100],
    ]);
  },
} satisfies SoundRecipe;
