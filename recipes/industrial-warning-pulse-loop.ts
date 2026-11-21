import type { SoundRecipe } from '../engine/types.ts';
import { beeps } from './_shared/alerts.ts';

export default {
  id: "industrial-warning-pulse-loop", name: "Industrial Warning Pulse", category: "Sci-Fi & UI",
  tags: ["alarm","siren","warning","industrial"], loopable: true, durationSec: 3,
  params: { edge: { label: "Edge", min: 0, max: 1, default: 0.57 } },
  targetRmsDbfs: -24,
  render(ctx, { params }) {
    return beeps(ctx, [[0.24, 632, 0.135, 1], [0.57, 632, 0.137, 0.82], [1.51, 735, 0.23, 0.90]], params.edge, 'alarm');
  },
} satisfies SoundRecipe;
