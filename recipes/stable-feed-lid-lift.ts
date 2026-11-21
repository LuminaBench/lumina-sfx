import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/wooden-chest-open.ts';
import source2 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "stable-feed-lid-lift",
  name: "Stable Feed Lid Lift",
  category: "Animals",
  tags: ["stable", "feed", "lid", "lift", "livestock"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .76, .66, .055, 8100],
      ['clip', source2, .27, .61, .44, .052, 7700],
      ["contact", "wood", .65, .22, .29, 360, .008],
    ]);
  },
} satisfies SoundRecipe;
