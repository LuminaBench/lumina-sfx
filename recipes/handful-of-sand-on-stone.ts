import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/dry-sand-footstep.ts';
import source2 from './_recordings/shake-soil-off-roots.ts';

export default {
  id: "handful-of-sand-on-stone",
  name: "Handful of Sand on Stone",
  category: "Impacts",
  tags: ["handful", "sand", "stone"],
  loopable: false,
  durationSec: 0.63,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .42, .67, .083, 8400],
      ["grains", "stone", .015, .52, .36, 2230, 33],
      ['clip', source2, .15, .35, .19, .08, 5000],
    ]);
  },
} satisfies SoundRecipe;
