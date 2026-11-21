import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/metal-deck-footstep.ts';

export default {
  id: "wet-ladder-rung-quick-landing-brace",
  name: "Wet Ladder Rung Quick Landing Brace",
  category: "Footsteps & UI",
  tags: ["wet", "ladder", "rung", "quick", "landing", "brace"],
  loopable: false,
  durationSec: 1.1,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.47, 0.72, 0.067, 8100, 0.007, 0.08],
      ["contact", "iron", 0.036, 0.35, 0.73, 358.34, 0.002],
      ['clip', source, 0.3, 0.67, 0.47, 0.051, 6642, 0.007, 0.08],
      ["grains", "iron", 0.48, 0.48, 0.18, 1136.2, 14],
    ]);
  },
} satisfies SoundRecipe;
