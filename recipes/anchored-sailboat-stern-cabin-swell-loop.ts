import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/reviewed-motion-sailboat-cabin.ts';

export default {
  id: "anchored-sailboat-stern-cabin-swell-loop",
  name: "Anchored sailboat stern-cabin swell loop",
  category: "Water & Fire",
  tags: ["anchored", "sailboat", "stern", "cabin", "swell", "boat", "marine"],
  loopable: true,
  durationSec: 6.4,
  targetRmsDbfs: -34,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 6.52, .93, .19, 6500, 0, 0],
    ]);
  },
} satisfies SoundRecipe;
