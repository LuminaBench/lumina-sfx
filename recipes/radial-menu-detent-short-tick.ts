import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-microclick.ts';

export default {
  id: "radial-menu-detent-short-tick",
  name: "Radial menu detent short tick",
  category: "Footsteps & UI",
  tags: ["radial", "menu", "detent", "short", "tick", "ui", "interface"],
  loopable: false,
  durationSec: 0.064,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .045, .74, 0, 11100, .00055, .006],
      ["contact", "rubber", 0, .03, .21, 860, .001],
    ]);
  },
} satisfies SoundRecipe;
