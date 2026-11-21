import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';
import source2 from './_recordings/response-crane-buzzer.ts';

export default {
  id: "relay-panel-brownout-warning",
  name: "Relay panel brownout warning",
  category: "Sci-Fi & UI",
  tags: ["relay", "panel", "brownout", "warning", "alert", "alarm"],
  loopable: false,
  durationSec: 0.74,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .10, .73, 0, 7200, .001, .02],
      ['clip', source2, 0, .62, .51, .29, 2280, .001, .21],
      ["motor", .02, .62, .15, 148, 57, .016, .82],
      ["contact", "iron", .52, .09, .39, 441, .0018],
    ]);
  },
} satisfies SoundRecipe;
