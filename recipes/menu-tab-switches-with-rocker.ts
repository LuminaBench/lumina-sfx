import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';

export default {
  id: "menu-tab-switches-with-rocker",
  name: "Menu tab switches with rocker",
  category: "Footsteps & UI",
  tags: ["menu", "tab", "switches", "rocker", "ui", "interface"],
  loopable: false,
  durationSec: 0.155,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .103, .90, 0, 9700, .001, .024],
      ["contact", "iron", .079, .059, .26, 920, .0008],
    ]);
  },
} satisfies SoundRecipe;
