import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-crane-buzzer.ts';

export default {
  id: "factory-crane-warning-single-close-buzzer",
  name: "Factory crane warning single close buzzer",
  category: "Sci-Fi & UI",
  tags: ["factory", "crane", "warning", "single", "close", "buzzer", "alert", "alarm"],
  loopable: false,
  durationSec: 1.28,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.28, .98, .009, 6100, .001, .16],
      ["contact", "iron", 0, .065, .23, 790, .001],
    ]);
  },
} satisfies SoundRecipe;
