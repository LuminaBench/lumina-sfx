import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/rock-pile-impact.ts';

export default {
  id: "brick-surface-hit-by-arcade-projectile",
  name: "Brick Surface Hit by Arcade Projectile",
  category: "Impacts",
  tags: ["brick", "surface", "hit", "arcade", "projectile"],
  loopable: false,
  durationSec: 0.51,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .43, .69, .04, 10200],
      ["contact", "stone", .012, .29, .78, 607, .002],
      ["grains", "soil", .06, .35, .29, 1830, 14],
    ]);
  },
} satisfies SoundRecipe;
