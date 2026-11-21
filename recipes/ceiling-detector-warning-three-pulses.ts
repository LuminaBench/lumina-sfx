import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-ceiling-piezo.ts';
import source2 from './_recordings/response-rocker.ts';

export default {
  id: "ceiling-detector-warning-three-pulses",
  name: "Ceiling detector warning three pulses",
  category: "Sci-Fi & UI",
  tags: ["ceiling", "detector", "warning", "three", "pulses", "alert", "alarm"],
  loopable: false,
  durationSec: 3.12,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .58, .97, .001, 4600, .001, .065],
      ['clip', source, 1.04, .575, .86, .002, 4900, .001, .060],
      ['clip', source, 2.04, .58, .91, .004, 4830, .001, .061],
      ['clip', source2, 2.73, .093, .19, 0, 3700, .001, .020],
    ]);
  },
} satisfies SoundRecipe;
