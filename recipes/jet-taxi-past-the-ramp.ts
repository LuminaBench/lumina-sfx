import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-fighter-taxi.ts';

export default {
  id: "jet-taxi-past-the-ramp",
  name: "Jet Taxi Past the Ramp",
  category: "Aircraft",
  tags: ["jet", "taxi", "past", "ramp"],
  loopable: false,
  durationSec: 6.6,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 6.4, .94, .054, 9600, .022, .45],
      ["brush", "air", .08, 5.78, .36, 512, .86],
    ]);
  },
} satisfies SoundRecipe;
