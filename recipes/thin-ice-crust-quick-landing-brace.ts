import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ice.ts';

export default {
  id: "thin-ice-crust-quick-landing-brace",
  name: "Thin Ice Crust Quick Landing Brace",
  category: "Footsteps & UI",
  tags: ["thin", "ice", "crust", "quick", "landing", "brace"],
  loopable: false,
  durationSec: 1.1,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.47, 0.72, 0.067, 8800, 0.007, 0.08],
      ["contact", "stone", 0.036, 0.35, 0.73, 295.2, 0.002],
      ['clip', source, 0.3, 0.67, 0.47, 0.051, 7216, 0.007, 0.08],
      ["grains", "stone", 0.48, 0.48, 0.18, 936, 14],
    ]);
  },
} satisfies SoundRecipe;
