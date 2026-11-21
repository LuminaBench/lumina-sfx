import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';
import source2 from './_recordings/wood-platform-landing.ts';

export default {
  id: "rope-bridge-deck-weight-transfer",
  name: "Rope Bridge Deck Weight Transfer",
  category: "Footsteps & UI",
  tags: ["rope", "bridge", "deck", "weight", "transfer"],
  loopable: false,
  durationSec: 0.73,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.42, 0.48, 0.046, 2760, 0.007, 0.08],
      ['clip', source2, 0.13, 0.53, 0.76, 0, 4600, 0.007, 0.08],
      ["contact", "wood", 0.224, 0.22, 0.42, 227, 0.002],
    ]);
  },
} satisfies SoundRecipe;
