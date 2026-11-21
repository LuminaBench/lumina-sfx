import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/slice-harvest-carrot.ts';

export default {
  id: "slice-harvest-carrot", name: "Slicing a Fresh Carrot", category: "Farming",
  tags: ["carrot", "slice", "cut", "produce", "prep"],
  durationSec: 0.3743, loopable: false, targetRmsDbfs: -23,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 12000 - params.distance * 7440 });
  },
} satisfies SoundRecipe;
