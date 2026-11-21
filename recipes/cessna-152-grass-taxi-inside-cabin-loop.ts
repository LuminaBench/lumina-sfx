import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-cessna-taxi.ts';

export default {
  id: "cessna-152-grass-taxi-inside-cabin-loop",
  name: "Cessna 152 grass taxi inside cabin loop",
  category: "Aircraft",
  tags: ["cessna", "152", "grass", "taxi", "inside", "cabin", "flight", "plane", "aircraft"],
  loopable: true,
  durationSec: 6.25,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 6.37, .95, .26, 5000, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
