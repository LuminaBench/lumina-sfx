import type { SoundRecipe } from '../engine/types.ts';
import { beeps } from './_shared/alerts.ts';

export default {
  id: "countdown-beeps", name: "Countdown Beeps", category: "Sci-Fi & UI",
  tags: ["countdown","beep","timer","ui"], loopable: false, durationSec: 1.56,
  params: { edge: { label: "Edge", min: 0, max: 1, default: 0.55 } },
  targetRmsDbfs: -23,
  render(ctx, { params }) {
    return beeps(ctx, [[0, 683, 0.079, 0.69], [0.324, 683, 0.079, 0.75], [0.650, 683, 0.079, 0.85], [0.973, 1171, 0.21, 1]], params.edge, 'clean');
  },
} satisfies SoundRecipe;
