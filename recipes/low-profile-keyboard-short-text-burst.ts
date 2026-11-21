import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-keys.ts';

export default {
  id: "low-profile-keyboard-short-text-burst",
  name: "Low-profile Keyboard Short Text Burst",
  category: "Props & Interactions",
  tags: ["low", "profile", "keyboard", "short", "text", "burst"],
  loopable: false,
  durationSec: 0.82,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.7, 0.81, 0.014, 7900, 0.007, 0.08],
      ["brush", "rubber", 0.07, 0.57, 0.25, 1071.84, 0.032],
      ["contact", "rubber", 0.22, 0.23, 0.38, 638, 0.002],
    ]);
  },
} satisfies SoundRecipe;
