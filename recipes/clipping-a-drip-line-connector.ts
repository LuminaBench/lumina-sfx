import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/physical-light-switch.ts';
import source2 from './_recordings/energy-cell-seating.ts';

export default {
  id: "clipping-a-drip-line-connector",
  name: "Clipping a Drip-Line Connector",
  category: "Farming",
  tags: ["clipping", "drip", "line", "connector", "farm"],
  loopable: false,
  durationSec: 0.45,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .13, .55, 0, 9300],
      ['clip', source2, .073, .23, .58, .015, 5500],
      ["contact", "rubber", .102, .18, .35, 345, .003],
    ]);
  },
} satisfies SoundRecipe;
