import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';

export default {
  id: "energy-rifle-empty-cell-release",
  name: "Energy rifle empty cell release",
  category: "Weapons",
  tags: ["energy", "rifle", "empty", "cell", "release", "reload", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.55,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .093, .77, 0, 9000, .001, .018],
      ["contact", "rubber", .063, .107, .63, 431, .0008],
      ["brush", "iron", .094, .182, .55, 1160, .008],
      ["tone", .068, .34, .13, 632, 189, .004, .27],
    ]);
  },
} satisfies SoundRecipe;
