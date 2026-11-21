import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/barn-timber-creak.ts';
import source2 from './_recordings/field-pepper-rip.ts';
import source3 from './_recordings/trim-scrub-branch.ts';

export default {
  id: "green-branch-bent-until-it-splits",
  name: "Green Branch Bent until It Splits",
  category: "Impacts",
  tags: ["green", "branch", "bent", "it", "splits"],
  loopable: false,
  durationSec: 1.08,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .65, .60, .047, 5950],
      ['clip', source2, .39, .51, .61, .09, 9800],
      ['clip', source3, .61, .36, .4, .08, 7500],
    ]);
  },
} satisfies SoundRecipe;
