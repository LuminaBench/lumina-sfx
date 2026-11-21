import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-glass-lid.ts';

export default {
  id: "glass-diagram-short-entry",
  name: "Glass Diagram Short Entry",
  category: "Sci-Fi & UI",
  tags: ["glass", "diagram", "short", "entry"],
  loopable: false,
  durationSec: 0.69,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.37, 0.26, 0.028, 9480, 0.007, 0.08],
      ["brush", "glass", 0, 0.43, 0.33, 3160, 0.06],
      ["contact", "glass", 0.137, 0.2, 0.48, 762, 0.002],
      ["tone", 0.1233, 0.36, 0.5, 617.22, 906.78, 0.021, 0.28],
    ]);
  },
} satisfies SoundRecipe;
