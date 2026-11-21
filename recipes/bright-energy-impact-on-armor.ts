import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/blacksmith-anvil-strike.ts';

export default {
  id: "bright-energy-impact-on-armor",
  name: "Bright Energy Impact on Armor",
  category: "Impacts",
  tags: ["bright", "energy", "impact", "armor"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .36, .61, .015, 8800],
      ["tone", .03, .72, .57, 745, 268, .021, .75],
      ["contact", "iron", .091, .58, .39, 558, .002],
    ]);
  },
} satisfies SoundRecipe;
