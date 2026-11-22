import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/dry-vine-brush.ts';
import source2 from './_recordings/physical-light-switch.ts';
import source3 from './_recordings/dry-branch-snap.ts';

export default {
  id: "clipping-a-grapevine-to-a-trellis",
  name: "Clipping a Grapevine to a Trellis",
  category: "Farming",
  tags: ["clipping", "grapevine", "trellis", "farm"],
  loopable: false,
  durationSec: 0.55,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .34, .65, .034, 9400],
      ['clip', source2, .094, .18, .69, 0, 10000],
      ['clip', source3, .18, .25, .36, .026, 8200],
    ]);
  },
} satisfies SoundRecipe;
