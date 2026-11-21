import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/door-handle-unlatch.ts';
import source2 from './_recordings/demo-tram-door.ts';

export default {
  id: "local-streetcar-door-unlatches",
  name: "Local Streetcar Door Unlatches",
  category: "Vehicles & Engines",
  tags: ["local", "streetcar", "door", "unlatches", "vehicle"],
  loopable: false,
  durationSec: 0.91,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.51, 0.66, 0.01, 9600, 0.007, 0.08],
      ["contact", "iron", 0.091, 0.28, 0.42, 689.43, 0.002],
      ['clip', source2, 0.2, 0.62, 0.3, 0.18, 4800, 0.007, 0.08],
    ]);
  },
} satisfies SoundRecipe;
