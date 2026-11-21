import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-rotor-pass.ts';

export default {
  id: "heavy-helicopter-approach",
  name: "Heavy Helicopter Approach",
  category: "Aircraft",
  tags: ["heavy", "helicopter", "approach"],
  loopable: false,
  durationSec: 5.1,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.95, .93, .11, 6850, .042, .09],
      ["brush", "air", 1.75, 3.25, .20, 680, .401],
    ]);
  },
} satisfies SoundRecipe;
