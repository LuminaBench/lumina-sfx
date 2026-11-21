import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/blacksmith-anvil-strike.ts';
import source2 from './_recordings/wooden-chest-shut.ts';

export default {
  id: "pressing-a-barrel-hoop-into-place",
  name: "Pressing a Barrel Hoop into Place",
  category: "Impacts",
  tags: ["pressing", "barrel", "hoop", "place"],
  loopable: false,
  durationSec: 0.86,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .37, .76, .014, 9300],
      ['clip', source2, .034, .51, .55, .054, 6400],
      ["contact", "iron", .33, .28, .45, 555, .002],
    ]);
  },
} satisfies SoundRecipe;
