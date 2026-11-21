import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/rock-pile-impact.ts';

export default {
  id: "rock-ledge-quick-landing-brace",
  name: "Rock Ledge Quick Landing Brace",
  category: "Footsteps & UI",
  tags: ["rock", "ledge", "quick", "landing", "brace"],
  loopable: false,
  durationSec: 1.1,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.47, 0.72, 0.067, 7100, 0.007, 0.08],
      ["contact", "stone", 0.036, 0.35, 0.73, 379.66, 0.002],
      ['clip', source, 0.3, 0.67, 0.47, 0.051, 5822, 0.007, 0.08],
      ["grains", "stone", 0.48, 0.48, 0.18, 1203.8, 14],
    ]);
  },
} satisfies SoundRecipe;
