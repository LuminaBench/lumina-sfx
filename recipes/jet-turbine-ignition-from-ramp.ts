import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-turbine-ignition.ts';

export default {
  id: "jet-turbine-ignition-from-ramp",
  name: "Jet Turbine Ignition from Ramp",
  category: "Aircraft",
  tags: ["jet", "turbine", "ignition", "ramp"],
  loopable: false,
  durationSec: 7.2,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 7.05, .98, .07, 10100, .018, .31],
      ["motor", .7, 5.3, .042, 73, 230, 1.8, .86],
    ]);
  },
} satisfies SoundRecipe;
