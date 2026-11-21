import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/dry-branch-snap.ts';

export default {
  id: "hardwood-panel-hit-by-arcade-projectile",
  name: "Hardwood Panel Hit by Arcade Projectile",
  category: "Impacts",
  tags: ["hardwood", "panel", "hit", "arcade", "projectile"],
  loopable: false,
  durationSec: 0.54,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .41, .60, .045, 11600],
      ["contact", "wood", .02, .32, .75, 320, .001],
      ["grains", "wood", .04, .37, .39, 1860, 8],
    ]);
  },
} satisfies SoundRecipe;
