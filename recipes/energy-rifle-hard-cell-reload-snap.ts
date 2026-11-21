import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-button.ts';

export default {
  id: "energy-rifle-hard-cell-reload-snap",
  name: "Energy rifle hard cell reload snap",
  category: "Weapons",
  tags: ["energy", "rifle", "hard", "cell", "reload", "snap", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.81,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .075, .61, 744, .0007],
      ["brush", "iron", .06, .34, .61, 1230, .007],
      ["contact", "rubber", .33, .163, .79, 273, .001],
      ['clip', source, .42, .091, .58, 0, 9800, .001, .023],
      ["tone", .421, .29, .15, 401, 555, .004, .42],
    ]);
  },
} satisfies SoundRecipe;
