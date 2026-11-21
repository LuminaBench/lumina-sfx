import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/chain-rattle-short.ts';
import source2 from './_recordings/door-chain-latch-slide.ts';

export default {
  id: "chain-pulled-slowly-through-a-ring",
  name: "Chain Pulled Slowly through a Ring",
  category: "Impacts",
  tags: ["chain", "pulled", "slowly", "ring"],
  loopable: false,
  durationSec: 1.24,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .87, .69, .021, 9450],
      ['clip', source2, .105, .68, .65, .05, 7800],
      ["grains", "iron", .42, .57, .26, 840, 15],
    ]);
  },
} satisfies SoundRecipe;
