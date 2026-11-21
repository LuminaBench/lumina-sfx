import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-key-single.ts';

export default {
  id: "mechanical-keyboard-single-key-tap",
  name: "Mechanical Keyboard Single Key Tap",
  category: "Props & Interactions",
  tags: ["mechanical", "keyboard", "single", "key", "tap"],
  loopable: false,
  durationSec: 0.82,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.7, 0.81, 0.014, 9600, 0.007, 0.08],
      ["brush", "rubber", 0.07, 0.57, 0.25, 697.2, 0.032],
      ["contact", "rubber", 0.22, 0.23, 0.38, 415, 0.002],
    ]);
  },
} satisfies SoundRecipe;
