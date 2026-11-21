import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-crane-buzzer.ts';
import source2 from './_recordings/response-button.ts';

export default {
  id: "factory-door-warning-two-unequal-buzzes",
  name: "Factory door warning two unequal buzzes",
  category: "Sci-Fi & UI",
  tags: ["factory", "door", "warning", "two", "unequal", "buzzes", "alert", "alarm"],
  loopable: false,
  durationSec: 1.61,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .44, .83, .013, 4310, .002, .057],
      ['clip', source, .57, .89, .72, .069, 4780, .002, .16],
      ['clip', source2, 0, .081, .27, 0, 5850, .001, .018],
    ]);
  },
} satisfies SoundRecipe;
