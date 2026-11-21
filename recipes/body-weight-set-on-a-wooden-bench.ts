import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/barn-timber-creak.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "body-weight-set-on-a-wooden-bench",
  name: "Body Weight Set on a Wooden Bench",
  category: "Footsteps & UI",
  tags: ["body", "weight", "set", "wooden", "bench"],
  loopable: false,
  durationSec: 0.93,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .71, .64, .146, 4850],
      ["contact", "wood", .075, .45, .52, 180, .009],
      ['clip', source2, .092, .64, .41, .03, 4300],
    ]);
  },
} satisfies SoundRecipe;
