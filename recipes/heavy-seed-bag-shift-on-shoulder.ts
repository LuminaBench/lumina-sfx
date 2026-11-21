import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/burlap-feed-sack-open.ts';
import source2 from './_recordings/leather-strap-flex.ts';

export default {
  id: "heavy-seed-bag-shift-on-shoulder",
  name: "Heavy Seed Bag Shift on Shoulder",
  category: "Footsteps & UI",
  tags: ["heavy", "seed", "bag", "shift", "shoulder"],
  loopable: false,
  durationSec: 0.95,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .77, .75, .012, 7600],
      ['clip', source2, .052, .61, .38, .048, 5500],
      ["contact", "rubber", .38, .37, .36, 180, .008],
    ]);
  },
} satisfies SoundRecipe;
