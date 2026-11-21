import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ice.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "thin-ice-crust-careful-edge-step",
  name: "Thin Ice Crust Careful Edge Step",
  category: "Footsteps & UI",
  tags: ["thin", "ice", "crust", "careful", "edge", "step"],
  loopable: false,
  durationSec: 0.65,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.59, 0.79, 0.073, 8800, 0.007, 0.08],
      ["contact", "stone", 0.086, 0.27, 0.5, 273.6, 0.002],
      ['clip', source2, 0.167, 0.39, 0.23, 0.064, 4928, 0.007, 0.08],
    ]);
  },
} satisfies SoundRecipe;
