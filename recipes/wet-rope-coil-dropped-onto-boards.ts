import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/burlap-feed-sack-open.ts';
import source2 from './_recordings/hardwood-footstep.ts';

export default {
  id: "wet-rope-coil-dropped-onto-boards",
  name: "Wet Rope Coil Dropped onto Boards",
  category: "Impacts",
  tags: ["wet", "rope", "coil", "dropped", "boards"],
  loopable: false,
  durationSec: 0.75,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .65, .61, .028, 6000],
      ["contact", "rubber", .071, .23, .63, 162, .003],
      ['clip', source2, .16, .43, .30, .095, 3800],
    ]);
  },
} satisfies SoundRecipe;
