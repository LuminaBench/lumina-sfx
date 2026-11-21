import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "quiet-interview-short-entry",
  name: "Quiet Interview Short Entry",
  category: "Sci-Fi & UI",
  tags: ["quiet", "interview", "short", "entry"],
  loopable: false,
  durationSec: 0.75,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.37, 0.26, 0.028, 4680, 0.007, 0.08],
      ["brush", "cloth", 0, 0.43, 0.33, 1560, 0.06],
      ["contact", "cloth", 0.185, 0.2, 0.48, 331, 0.002],
      ["tone", 0.1665, 0.36, 0.5, 268.11, 393.89, 0.021, 0.28],
    ]);
  },
} satisfies SoundRecipe;
