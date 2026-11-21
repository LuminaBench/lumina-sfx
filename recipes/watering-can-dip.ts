import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/watering-can-dip.ts';

export default {
  id: "watering-can-dip", name: "Filling a Watering Can from a Barrel", category: "Farming",
  tags: ["watering-can", "barrel", "dip", "fill", "water"],
  durationSec: 1.595, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 10200 - params.distance * 6324 });
  },
} satisfies SoundRecipe;
