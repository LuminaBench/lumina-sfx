import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/watering-can-rose.ts';

export default {
  id: "watering-can-rose", name: "Watering Can on Garden Bed", category: "Farming",
  tags: ["water", "plants", "sprinkle", "garden", "watering-can"],
  durationSec: 1.885, loopable: false, targetRmsDbfs: -25,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 10400 - params.distance * 6448 });
  },
} satisfies SoundRecipe;
