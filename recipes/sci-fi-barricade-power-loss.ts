import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/energy-cell-seating.ts';

export default {
  id: "sci-fi-barricade-power-loss",
  name: "Sci-fi Barricade Power Loss",
  category: "Impacts",
  tags: ["sci", "fi", "barricade", "power", "loss"],
  loopable: false,
  durationSec: 1.57,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, 1.10, .52, 550, .16],
      ["tone", .03, 1.09, .52, 215, 48, .081, .76],
      ['clip', source, .69, .51, .35, .08, 6150],
      ["contact", "rubber", .89, .37, .47, 160, .001],
    ]);
  },
} satisfies SoundRecipe;
