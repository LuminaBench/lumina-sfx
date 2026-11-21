import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-crane-buzzer.ts';

export default {
  id: "terrain-proximity-warning-rough-buzz",
  name: "Terrain proximity warning rough buzz",
  category: "Sci-Fi & UI",
  tags: ["terrain", "proximity", "warning", "rough", "buzz", "alert", "alarm"],
  loopable: false,
  durationSec: 1.13,
  targetRmsDbfs: -25.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .25, .70, .053, 2800, .001, .051],
      ['clip', source, .33, .65, .88, .069, 3350, .001, .10],
      ["motor", .021, .223, .13, 229, 219, .003, .84],
    ]);
  },
} satisfies SoundRecipe;
