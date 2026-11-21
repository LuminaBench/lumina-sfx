import type { SoundRecipe } from '../engine/types.ts';
import { beeps } from './_shared/alerts.ts';

export default {
  id: "console-error-buzz", name: "Console Error Buzz", category: "Sci-Fi & UI",
  tags: ["error","buzz","ui","alarm"], loopable: false, durationSec: 0.65,
  params: { edge: { label: "Edge", min: 0, max: 1, default: 0.65 } },
  targetRmsDbfs: -22,
  render(ctx, { params }) {
    return beeps(ctx, [[0, 372, 0.143, 1], [0.162, 243, 0.184, 0.89]], params.edge, 'alarm');
  },
} satisfies SoundRecipe;
