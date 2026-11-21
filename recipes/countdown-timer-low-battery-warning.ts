import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-kitchen-timer.ts';
import source2 from './_recordings/response-appliance-single.ts';

export default {
  id: "countdown-timer-low-battery-warning",
  name: "Countdown timer low battery warning",
  category: "Sci-Fi & UI",
  tags: ["countdown", "timer", "low", "battery", "warning", "alert", "alarm"],
  loopable: false,
  durationSec: 2.06,
  targetRmsDbfs: -27.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .617, .66, .004, 4450, .001, .071],
      ['clip', source2, .88, .243, .93, .001, 8810, .001, .021],
      ['clip', source2, 1.60, .239, .79, .002, 6850, .001, .020],
    ]);
  },
} satisfies SoundRecipe;
