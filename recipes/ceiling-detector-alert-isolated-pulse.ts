import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-ceiling-piezo.ts';

export default {
  id: "ceiling-detector-alert-isolated-pulse",
  name: "Ceiling detector alert isolated pulse",
  category: "Sci-Fi & UI",
  tags: ["ceiling", "detector", "alert", "isolated", "pulse", "warning", "alarm"],
  loopable: false,
  durationSec: 0.65,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .58, .96, .001, 5200, .001, .065],
    ]);
  },
} satisfies SoundRecipe;
