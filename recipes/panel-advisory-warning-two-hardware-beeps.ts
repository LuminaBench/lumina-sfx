import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-appliance-double.ts';
import source2 from './_recordings/response-button.ts';

export default {
  id: "panel-advisory-warning-two-hardware-beeps",
  name: "Panel advisory warning two hardware beeps",
  category: "Sci-Fi & UI",
  tags: ["panel", "advisory", "warning", "two", "hardware", "beeps", "alert", "alarm"],
  loopable: false,
  durationSec: 0.68,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .615, 1, .001, 5600, .001, .064],
      ['clip', source2, 0, .078, .19, 0, 4900, .001, .018],
    ]);
  },
} satisfies SoundRecipe;
