import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';
import source2 from './_recordings/rock-pile-impact.ts';

export default {
  id: "rock-ledge-foot-lifts-free",
  name: "Rock Ledge Foot Lifts Free",
  category: "Footsteps & UI",
  tags: ["rock", "ledge", "foot", "lifts", "free"],
  loopable: false,
  durationSec: 0.81,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.61, 0.57, 0.1, 4473, 0.007, 0.08],
      ["brush", "stone", 0.07, 0.61, 0.56, 856.55, 0.044],
      ['clip', source2, 0.239, 0.5, 0.49, 0.14, 5822, 0.007, 0.08],
    ]);
  },
} satisfies SoundRecipe;
