import type { SoundRecipe } from '../engine/types.ts';
import { beeps } from './_shared/alerts.ts';

export default {
  id: "device-connect-beep", name: "Device Connect Beep", category: "Sci-Fi & UI",
  tags: ["device","connect","beep","ui"], loopable: false, durationSec: 0.45,
  params: { edge: { label: "Edge", min: 0, max: 1, default: 0.57 } },
  targetRmsDbfs: -24,
  render(ctx, { params }) {
    return beeps(ctx, [[0, 620, 0.082, 0.93], [0.087, 1050, 0.123, 1]], params.edge, 'clean');
  },
} satisfies SoundRecipe;
