import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/backfill-furrow.ts';

export default {
  id: "backfill-furrow", name: "Backfilling a Furrow", category: "Farming",
  tags: ["soil", "backfill", "planting", "furrow"],
  durationSec: 0.6022, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 8600 - params.distance * 5332 });
  },
} satisfies SoundRecipe;
