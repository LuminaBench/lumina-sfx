import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/physical-light-switch.ts';

export default {
  id: "interior-indicator-three-ticks",
  name: "Interior Indicator Three Ticks",
  category: "Vehicles & Engines",
  tags: ["interior", "indicator", "three", "ticks", "vehicle"],
  loopable: false,
  durationSec: 0.95,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .15, .60, 0, 10600],
      ["contact", "rubber", .043, .17, .72, 410, .001],
      ['clip', source, .31, .13, .50, 0, 8000],
      ["contact", "iron", .584, .16, .51, 682, .001],
    ]);
  },
} satisfies SoundRecipe;
