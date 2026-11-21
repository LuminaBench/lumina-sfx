import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/wooden-chest-latch-release.ts';

export default {
  id: "washable-lunch-box-seal-clicks-shut",
  name: "Washable Lunch Box Seal Clicks Shut",
  category: "Props & Interactions",
  tags: ["washable", "lunch", "box", "seal", "clicks", "shut"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.6, 0.65, 0.22, 5095.4, 0.007, 0.08],
      ["contact", "rubber", 0.067, 0.29, 0.44, 363.48, 0.002],
      ["grains", "rubber", 0.107, 0.51, 0.22, 932, 8],
      ["contact", "wood", 0.525, 0.3, 0.39, 307.56, 0.002],
    ]);
  },
} satisfies SoundRecipe;
