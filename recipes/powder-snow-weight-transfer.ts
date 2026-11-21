import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';
import source2 from './_recordings/packed-snow-footstep.ts';

export default {
  id: "powder-snow-weight-transfer",
  name: "Powder Snow Weight Transfer",
  category: "Footsteps & UI",
  tags: ["powder", "snow", "weight", "transfer"],
  loopable: false,
  durationSec: 0.73,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.42, 0.48, 0.046, 2700, 0.007, 0.08],
      ['clip', source2, 0.13, 0.53, 0.76, 0, 4500, 0.007, 0.08],
      ["contact", "soil", 0.224, 0.22, 0.42, 195, 0.002],
    ]);
  },
} satisfies SoundRecipe;
