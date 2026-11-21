import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/wet-crop-brush.ts';

export default {
  id: "wet-crop-brush", name: "Brushing Wet Crop Leaves", category: "Farming",
  tags: ["leaves", "wet", "crop", "foliage", "brush"],
  durationSec: 0.665, loopable: false, targetRmsDbfs: -27,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 9700 - params.distance * 6014 });
  },
} satisfies SoundRecipe;
