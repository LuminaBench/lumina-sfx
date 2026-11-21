import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/orchard-shears-snip.ts';

export default {
  id: "orchard-shears-snip", name: "Orchard Pruning Shears", category: "Farming",
  tags: ["shears", "prune", "tool", "orchard", "metal"],
  durationSec: 0.3641, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  spectrum: [{ band: 'high', minShare: 0.018 }],
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 11800 - params.distance * 7316 });
  },
} satisfies SoundRecipe;
