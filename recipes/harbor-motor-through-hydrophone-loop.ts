import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-harbor-hydrophone.ts';

export default {
  perspective: "submerged", contains: ["underwater harbor motor"], markers: {"bed": 0},
  id: "harbor-motor-through-hydrophone-loop",
  name: "Harbor motor through hydrophone loop",
  category: "Water & Fire",
  tags: ["harbor", "motor", "hydrophone", "boat", "marine"],
  loopable: true,
  durationSec: 6.0,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 6.12, 1, .31, 2800, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
