import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ev-surface.ts';

export default {
  id: "ev-passing-through-a-parking-structure",
  name: "EV Passing through a Parking Structure",
  category: "Vehicles & Engines",
  tags: ["ev", "passing", "parking", "structure", "vehicle"],
  loopable: false,
  durationSec: 5.6,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.45, .73, 1.1, 4100, .022, .38],
      ['clip', source, .07, 5.38, .24, 1.1, 2460, .026, .60],
      ["brush", "air", 1.9, 3.13, .21, 1020, .58],
    ]);
  },
} satisfies SoundRecipe;
