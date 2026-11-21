import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "night-mode-showcase-short-entry",
  name: "Night Mode Showcase Short Entry",
  category: "Sci-Fi & UI",
  tags: ["night", "mode", "showcase", "short", "entry"],
  loopable: false,
  durationSec: 0.83,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.37, 0.26, 0.028, 3930, 0.007, 0.08],
      ["brush", "air", 0, 0.43, 0.33, 1310, 0.06],
      ["contact", "air", 0.252, 0.2, 0.48, 216, 0.002],
      ["tone", 0.2268, 0.36, 0.5, 174.96, 257.04, 0.021, 0.28],
    ]);
  },
} satisfies SoundRecipe;
