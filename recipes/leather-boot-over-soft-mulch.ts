import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/dry-leaves-footstep.ts';
import source2 from './_recordings/bundle-dry-stalks.ts';

export default {
  id: "leather-boot-over-soft-mulch",
  name: "Leather Boot over Soft Mulch",
  category: "Footsteps & UI",
  tags: ["leather", "boot", "soft", "mulch"],
  loopable: false,
  durationSec: 0.64,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .56, .75, .044, 7300],
      ['clip', source2, .018, .52, .43, .112, 6900],
      ["contact", "soil", .077, .27, .38, 322, .003],
    ]);
  },
} satisfies SoundRecipe;
