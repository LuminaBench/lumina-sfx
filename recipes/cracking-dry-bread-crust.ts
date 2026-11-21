import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/eggshell-pinch.ts';
import source2 from './_recordings/bundle-dry-stalks.ts';
import source3 from './_recordings/dry-branch-snap.ts';

export default {
  id: "cracking-dry-bread-crust",
  name: "Cracking Dry Bread Crust",
  category: "Props & Interactions",
  tags: ["cracking", "dry", "bread", "crust"],
  loopable: false,
  durationSec: 0.55,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .31, .69, .02, 9750],
      ['clip', source2, .05, .44, .37, .02, 7300],
      ['clip', source3, .098, .24, .36, 0, 6650],
    ]);
  },
} satisfies SoundRecipe;
