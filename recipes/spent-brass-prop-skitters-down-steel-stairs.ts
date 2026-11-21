import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "spent-brass-prop-skitters-down-steel-stairs",
  name: "Spent brass prop skitters down steel stairs",
  category: "Weapons",
  tags: ["spent", "brass", "prop", "skitters", "down", "steel", "stairs"],
  loopable: false,
  durationSec: 1.16,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .149, .75, 1420, .00048],
      ["contact", "iron", .127, .13, .55, 1760, .0005],
      ["contact", "iron", .284, .16, .64, 1300, .00062],
      ["contact", "iron", .41, .16, .49, 1640, .0007],
      ["grains", "iron", .57, .47, .43, 1400, 9],
    ]);
  },
} satisfies SoundRecipe;
