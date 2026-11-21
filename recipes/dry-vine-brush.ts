import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/dry-vine-brush.ts';

export default {
  id: "dry-vine-brush", name: "Brushing a Dry Vine", category: "Farming",
  tags: ["vine", "dry", "leaf", "foliage", "brush"],
  durationSec: 0.7151, loopable: false, targetRmsDbfs: -26,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 10800 - params.distance * 6696 });
  },
} satisfies SoundRecipe;
