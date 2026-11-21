import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "fabric-barrier-hit-by-arcade-projectile",
  name: "Fabric Barrier Hit by Arcade Projectile",
  category: "Impacts",
  tags: ["fabric", "barrier", "hit", "arcade", "projectile"],
  loopable: false,
  durationSec: 0.52,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .41, .53, .057, 8600],
      ["contact", "cloth", .014, .28, .78, 633, .003],
      ["brush", "cloth", .078, .32, .65, 830, .012],
    ]);
  },
} satisfies SoundRecipe;
