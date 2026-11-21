import type { SoundRecipe } from '../engine/types.ts';
import { beeps } from './_shared/alerts.ts';

export default {
  id: "phone-ring-warm", name: "Phone Ring · Warm Chime", category: "Footsteps & UI",
  tags: ["phone","ringtone","chime","melodic"], loopable: false, durationSec: 2.35,
  params: { color: { label: "Color", min: 0, max: 1, default: 0.64 } },
  targetRmsDbfs: -23,
  render(ctx, { params }) {
    return beeps(ctx, [[0, 498, 0.14, 0.93], [0.17, 745, 0.20, 0.82], [0.39, 936, 0.24, 1], [0.74, 621, 0.25, 0.86], [1.18, 745, 0.14, 0.64], [1.37, 498, 0.32, 0.68]], params.color, 'soft');
  },
} satisfies SoundRecipe;
