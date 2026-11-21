import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';

export default {
  id: "panel-closed-cloth-and-catch",
  name: "Panel closed cloth and catch",
  category: "Footsteps & UI",
  tags: ["panel", "closed", "cloth", "catch", "ui", "interface"],
  loopable: false,
  durationSec: 0.247,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "cloth", 0, .181, .78, 660, .002],
      ['clip', source, .072, .102, .44, 0, 6500, .001, .023],
      ["contact", "wood", .084, .127, .47, 249, .0015],
    ]);
  },
} satisfies SoundRecipe;
