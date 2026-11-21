import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/apple-falls-in-orchard.ts';

export default {
  id: "apple-falls-in-orchard", name: "Apple Falling on Orchard Ground", category: "Farming",
  tags: ["apple", "fruit", "drop", "orchard", "ground"],
  durationSec: 0.8378, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 8500 - params.distance * 5270 });
  },
} satisfies SoundRecipe;
