import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/action-lever-cycle.ts';

export default {
  id: "binder-ring-mechanism-spring-snap-shut",
  name: "Binder Ring Mechanism Spring Snap Shut",
  category: "Props & Interactions",
  tags: ["binder", "ring", "mechanism", "spring", "snap", "shut"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.6, 0.65, 0.22, 8395, 0.007, 0.08],
      ["contact", "iron", 0.067, 0.29, 0.44, 432.9, 0.002],
      ["grains", "iron", 0.107, 0.51, 0.22, 1110, 8],
      ["contact", "wood", 0.525, 0.3, 0.39, 366.3, 0.002],
    ]);
  },
} satisfies SoundRecipe;
