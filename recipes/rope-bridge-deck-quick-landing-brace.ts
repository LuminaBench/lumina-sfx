import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/wood-platform-landing.ts';

export default {
  id: "rope-bridge-deck-quick-landing-brace",
  name: "Rope Bridge Deck Quick Landing Brace",
  category: "Footsteps & UI",
  tags: ["rope", "bridge", "deck", "quick", "landing", "brace"],
  loopable: false,
  durationSec: 1.1,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.47, 0.72, 0.067, 4600, 0.007, 0.08],
      ["contact", "wood", 0.036, 0.35, 0.73, 186.14, 0.002],
      ['clip', source, 0.3, 0.67, 0.47, 0.051, 3772, 0.007, 0.08],
      ["grains", "wood", 0.48, 0.48, 0.18, 590.2, 14],
    ]);
  },
} satisfies SoundRecipe;
