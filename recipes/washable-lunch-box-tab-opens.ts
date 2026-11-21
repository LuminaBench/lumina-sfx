import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/wooden-chest-latch-release.ts';

export default {
  id: "washable-lunch-box-tab-opens",
  name: "Washable Lunch Box Tab Opens",
  category: "Props & Interactions",
  tags: ["washable", "lunch", "box", "tab", "opens"],
  loopable: false,
  durationSec: 0.82,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.7, 0.81, 0.014, 6980, 0.007, 0.08],
      ["brush", "rubber", 0.07, 0.57, 0.25, 782.88, 0.032],
      ["contact", "rubber", 0.22, 0.23, 0.38, 466, 0.002],
    ]);
  },
} satisfies SoundRecipe;
