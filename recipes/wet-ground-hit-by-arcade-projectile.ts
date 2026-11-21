import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/shallow-water-footstep.ts';

export default {
  id: "wet-ground-hit-by-arcade-projectile",
  name: "Wet Ground Hit by Arcade Projectile",
  category: "Impacts",
  tags: ["wet", "ground", "hit", "arcade", "projectile"],
  loopable: false,
  durationSec: 0.64,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .56, .72, .059, 8100],
      ["contact", "soil", .027, .35, .81, 303, .002],
      ["grains", "water", .075, .42, .35, 920, 14],
    ]);
  },
} satisfies SoundRecipe;
