import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/ceramic-mug-set-down.ts';

export default {
  id: "ceramic-mug-on-cork-small-base-shift",
  name: "Ceramic Mug on Cork Small Base Shift",
  category: "Props & Interactions",
  tags: ["ceramic", "mug", "cork", "small", "base", "shift"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.6, 0.65, 0.22, 3577, 0.007, 0.08],
      ["contact", "wood", 0.067, 0.29, 0.44, 238.68, 0.002],
      ["grains", "wood", 0.107, 0.51, 0.22, 612, 8],
      ["contact", "wood", 0.525, 0.3, 0.39, 201.96, 0.002],
    ]);
  },
} satisfies SoundRecipe;
