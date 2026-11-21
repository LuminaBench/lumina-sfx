import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/burlap-feed-sack-open.ts';

export default {
  id: "burlap-feed-sack-open", name: "Opening a Burlap Feed Sack", category: "Farming",
  tags: ["burlap", "sack", "bag", "feed", "cloth"],
  durationSec: 0.7082, loopable: false, targetRmsDbfs: -25,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 8900 - params.distance * 5518 });
  },
} satisfies SoundRecipe;
