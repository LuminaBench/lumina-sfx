import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ratchet.ts';
import source2 from './_recordings/motion-clank-close.ts';

export default {
  id: "shotgun-prop-reload-wood-pump-clack",
  name: "Shotgun prop reload wood pump clack",
  category: "Weapons",
  tags: ["shotgun", "prop", "reload", "wood", "pump", "clack", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.86,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "wood", 0, .097, .69, 515, .001],
      ['clip', source, .006, .62, .53, .03, 6700, .003, .17],
      ["brush", "iron", .104, .36, .56, 938, .015],
      ["contact", "wood", .261, .24, .73, 220, .0018],
      ['clip', source2, .49, .29, .58, .021, 8400, .002, .065],
      ["contact", "iron", .57, .16, .48, 738, .0011],
    ]);
  },
} satisfies SoundRecipe;
