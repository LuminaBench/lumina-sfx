import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-turbine-idle.ts';

export default {
  id: "jet-engine-shutoff-downwind",
  name: "Jet Engine Shutoff Downwind",
  category: "Aircraft",
  tags: ["jet", "engine", "shutoff", "downwind"],
  loopable: false,
  durationSec: 5.4,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.1, .54, .61, 3200, .017, 1.6],
      ["motor", .22, 4.6, .49, 268, 57, .051, .36],
      ["brush", "air", 1.41, 3.6, .32, 1140, .25],
    ]);
  },
} satisfies SoundRecipe;
