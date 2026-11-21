import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hardwood-footstep.ts';
import source2 from './_recordings/barn-timber-creak.ts';
import source3 from './_recordings/wood-platform-landing.ts';

export default {
  id: "climb-a-farm-fence-paling",
  name: "Climb a Farm Fence Paling",
  category: "Footsteps & UI",
  tags: ["climb", "farm", "fence", "paling"],
  loopable: false,
  durationSec: 1.18,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .52, .58, .029, 6200],
      ['clip', source2, .115, .81, .51, .06, 5000],
      ['clip', source3, .51, .58, .72, .02, 4900],
    ]);
  },
} satisfies SoundRecipe;
