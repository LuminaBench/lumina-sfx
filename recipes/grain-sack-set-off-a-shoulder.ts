import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/burlap-feed-sack-open.ts';
import source2 from './_recordings/drop-root-crops-crate.ts';

export default {
  id: "grain-sack-set-off-a-shoulder",
  name: "Grain Sack Set off a Shoulder",
  category: "Footsteps & UI",
  tags: ["grain", "sack", "set", "shoulder"],
  loopable: false,
  durationSec: 0.81,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .66, .72, .071, 7400],
      ["contact", "soil", .11, .43, .66, 168, .006],
      ['clip', source2, .24, .48, .38, .104, 4350],
    ]);
  },
} satisfies SoundRecipe;
