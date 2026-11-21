import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/glass-wall-collapse.ts';
import source2 from './_recordings/jar-shatter-on-tile.ts';

export default {
  id: "arcade-glass-cluster-scattering",
  name: "Arcade Glass Cluster Scattering",
  category: "Impacts",
  tags: ["arcade", "glass", "cluster", "scattering"],
  loopable: false,
  durationSec: 1.33,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .64, .60, .14, 11800],
      ['clip', source2, .082, .80, .61, .15, 12500],
      ["grains", "glass", .14, 1.10, .52, 2650, 34],
      ["contact", "wood", .37, .30, .18, 490, .008],
    ]);
  },
} satisfies SoundRecipe;
