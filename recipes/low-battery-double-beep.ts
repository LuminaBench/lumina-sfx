import type { SoundRecipe } from '../engine/types.ts';
import { beeps } from './_shared/alerts.ts';

export default {
  id: "low-battery-double-beep", name: "Low Battery Double Beep", category: "Footsteps & UI",
  tags: ["phone","battery","beep","warning"], loopable: false, durationSec: 0.65,
  params: { edge: { label: "Edge", min: 0, max: 1, default: 0.48 } },
  targetRmsDbfs: -23,
  render(ctx, { params }) {
    return beeps(ctx, [[0, 924, 0.085, 1], [0.166, 668, 0.111, 0.89]], params.edge, 'clean');
  },
} satisfies SoundRecipe;
