import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-chain-link.ts';
import source2 from './_recordings/milestone-smallwater.ts';

export default {
  id: "anchor-links-jump-over-bow-roller",
  name: "Anchor links jump over bow roller",
  category: "Water & Fire",
  tags: ["anchor", "links", "jump", "bow", "roller", "boat", "marine"],
  loopable: false,
  durationSec: 1.76,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.69, .74, .065, 9400, .004, .19],
      ["contact", "iron", 0, .09, .3, 680, .0008],
      ["contact", "wood", 1.15, .19, .37, 308, .002],
      ['clip', source2, .78, .94, .28, .48, 3900, .15, .20],
    ]);
  },
} satisfies SoundRecipe;
