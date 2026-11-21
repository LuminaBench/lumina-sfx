import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-airliner-approach.ts';

export default {
  id: "passenger-jet-final-approach",
  name: "Passenger Jet Final Approach",
  category: "Aircraft",
  tags: ["passenger", "jet", "final", "approach"],
  loopable: false,
  durationSec: 8.1,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 8, .90, .40, 7680, .016, .35],
      ["brush", "air", .64, 7.1, .25, 2230, 1.9],
    ]);
  },
} satisfies SoundRecipe;
