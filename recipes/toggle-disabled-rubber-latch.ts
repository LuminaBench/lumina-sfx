import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';

export default {
  id: "toggle-disabled-rubber-latch",
  name: "Toggle disabled rubber latch",
  category: "Footsteps & UI",
  tags: ["toggle", "disabled", "rubber", "latch", "ui", "interface"],
  loopable: false,
  durationSec: 0.127,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .10, .52, .001, 3700, .001, .026],
      ["contact", "rubber", .025, .095, .55, 300, .0009],
    ]);
  },
} satisfies SoundRecipe;
