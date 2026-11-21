import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-net.ts';

export default {
  id: "basketball-hoop-rim-and-net-settle",
  name: "Basketball Hoop Rim and Net Settle",
  category: "Impacts",
  tags: ["basketball", "hoop", "rim", "net", "settle"],
  loopable: false,
  durationSec: 1.21,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .082, .38, 920, .0009],
      ['clip', source, 0, 0.46, 0.61, 0.04, 10900, 0.007, 0.08],
      ["contact", "iron", 0.035, 0.23, 0.54, 296.31, 0.002],
      ['clip', source, 0.37, 0.76, 0.52, 0.19, 8502, 0.007, 0.08],
      ["contact", "iron", 0.56, 0.27, 0.34, 410.55, 0.002],
      ["grains", "iron", 0.61, 0.5, 0.19, 714, 12],
    ]);
  },
} satisfies SoundRecipe;
