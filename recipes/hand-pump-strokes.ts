import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/hand-pump-strokes.ts';

export default {
  id: "hand-pump-strokes", name: "Hand Water Pump Strokes", category: "Farming",
  tags: ["well", "pump", "water", "handle", "mechanical"],
  durationSec: 1.6475, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 11000 - params.distance * 6820 });
  },
} satisfies SoundRecipe;
