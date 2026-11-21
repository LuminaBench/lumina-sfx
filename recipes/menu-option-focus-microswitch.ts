import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-button.ts';

export default {
  id: "menu-option-focus-microswitch",
  name: "Menu option focus microswitch",
  category: "Footsteps & UI",
  tags: ["menu", "option", "focus", "microswitch", "ui", "interface"],
  loopable: false,
  durationSec: 0.09,
  targetRmsDbfs:  -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .081, .79, 0, 10200, .0005, .014],
      ["contact", "rubber", 0, .038, .24, 420, .0006],
    ]);
  },
} satisfies SoundRecipe;
