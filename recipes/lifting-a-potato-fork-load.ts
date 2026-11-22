import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/spade-turn-loam.ts';
import source2 from './_recordings/slatted-crate-settle.ts';
import source3 from './_recordings/shake-soil-off-roots.ts';

export default {
  id: "lifting-a-potato-fork-load",
  name: "Lifting a Potato Fork Load",
  category: "Farming",
  tags: ["lifting", "potato", "fork", "load", "farm"],
  loopable: false,
  durationSec: 0.98,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .61, .73, .01, 9400],
      ['clip', source2, .18, .27, .29, .048, 3600],
      ['clip', source3, .37, .50, .54, 0, 8200],
    ]);
  },
} satisfies SoundRecipe;
