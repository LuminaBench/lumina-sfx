import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-key-single.ts';

export default {
  id: "mechanical-keyboard-spacebar-and-release",
  name: "Mechanical Keyboard Spacebar and Release",
  category: "Props & Interactions",
  tags: ["mechanical", "keyboard", "spacebar", "release"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.6, 0.65, 0.22, 7008, 0.007, 0.08],
      ["contact", "rubber", 0.067, 0.29, 0.44, 323.7, 0.002],
      ["grains", "rubber", 0.107, 0.51, 0.22, 830, 8],
      ["contact", "wood", 0.525, 0.3, 0.39, 273.9, 0.002],
    ]);
  },
} satisfies SoundRecipe;
