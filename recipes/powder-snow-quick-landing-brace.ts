import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/packed-snow-footstep.ts';

export default {
  id: "powder-snow-quick-landing-brace",
  name: "Powder Snow Quick Landing Brace",
  category: "Footsteps & UI",
  tags: ["powder", "snow", "quick", "landing", "brace"],
  loopable: false,
  durationSec: 1.1,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.47, 0.72, 0.067, 4500, 0.007, 0.08],
      ["contact", "soil", 0.036, 0.35, 0.73, 159.9, 0.002],
      ['clip', source, 0.3, 0.67, 0.47, 0.051, 3690, 0.007, 0.08],
      ["grains", "soil", 0.48, 0.48, 0.18, 507, 14],
    ]);
  },
} satisfies SoundRecipe;
