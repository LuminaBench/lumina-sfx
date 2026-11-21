import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/physical-light-switch.ts';

export default {
  id: "pixel-demo-focus-short-entry",
  name: "Pixel Demo Focus Short Entry",
  category: "Sci-Fi & UI",
  tags: ["pixel", "demo", "focus", "short", "entry"],
  loopable: false,
  durationSec: 0.64,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.37, 0.26, 0.028, 6780, 0.007, 0.08],
      ["brush", "rubber", 0, 0.43, 0.33, 2260, 0.06],
      ["contact", "rubber", 0.096, 0.2, 0.48, 467, 0.002],
      ["tone", 0.0864, 0.36, 0.5, 378.27, 555.73, 0.021, 0.28],
    ]);
  },
} satisfies SoundRecipe;
