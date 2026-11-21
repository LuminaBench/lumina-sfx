import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-tool.ts';

export default {
  id: "socket-tool-on-bench-drop-and-settle",
  name: "Socket Tool on Bench Drop and Settle",
  category: "Props & Interactions",
  tags: ["socket", "tool", "bench", "drop", "settle"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.6, 0.65, 0.22, 6825.5, 0.007, 0.08],
      ["contact", "iron", 0.067, 0.29, 0.44, 492.96, 0.002],
      ["grains", "iron", 0.107, 0.51, 0.22, 1264, 8],
      ["contact", "wood", 0.525, 0.3, 0.39, 417.12, 0.002],
    ]);
  },
} satisfies SoundRecipe;
