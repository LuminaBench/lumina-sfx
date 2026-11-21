import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';

export default {
  id: "menu-selection-firm-downclick",
  name: "Menu selection firm downclick",
  category: "Footsteps & UI",
  tags: ["menu", "selection", "firm", "downclick", "ui", "interface"],
  loopable: false,
  durationSec: 0.143,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .101, .68, 0, 7900, .001, .024],
      ["contact", "rubber", .019, .087, .53, 293, .001],
    ]);
  },
} satisfies SoundRecipe;
