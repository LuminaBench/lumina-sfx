import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/bundle-dry-stalks.ts';
import source2 from './_recordings/mud-squelch-footstep.ts';

export default {
  id: "rubber-boot-in-wet-straw",
  name: "Rubber Boot in Wet Straw",
  category: "Footsteps & UI",
  tags: ["rubber", "boot", "wet", "straw"],
  loopable: false,
  durationSec: 0.64,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .43, .58, .139, 5900],
      ['clip', source2, .06, .49, .73, .045, 7100],
      ["contact", "rubber", .106, .22, .32, 189, .005],
    ]);
  },
} satisfies SoundRecipe;
