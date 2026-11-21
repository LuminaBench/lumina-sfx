import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "arcade-revolver-prop-cylinder-latches-shut",
  name: "Arcade revolver prop cylinder latches shut",
  category: "Weapons",
  tags: ["arcade", "revolver", "prop", "cylinder", "latches", "shut", "reload", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.37,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .29, .77, .015, 7900, .002, .071],
      ["contact", "iron", 0, .091, .69, 694, .00072],
      ["contact", "iron", .063, .067, .58, 1530, .0008],
      ["contact", "rubber", .103, .09, .31, 347, .001],
    ]);
  },
} satisfies SoundRecipe;
