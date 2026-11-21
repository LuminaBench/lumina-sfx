import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-appliance-single.ts';

export default {
  id: "appliance-timer-warning-single-beep",
  name: "Appliance timer warning single beep",
  category: "Sci-Fi & UI",
  tags: ["appliance", "timer", "warning", "single", "beep", "alert", "alarm"],
  loopable: false,
  durationSec: 0.29,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .244, 1, .001, 6800, .001, .030],
    ]);
  },
} satisfies SoundRecipe;
