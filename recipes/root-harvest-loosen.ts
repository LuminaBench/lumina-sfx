import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/root-harvest-loosen.ts';

export default {
  id: "root-harvest-loosen", name: "Loosening Root Vegetables", category: "Farming",
  tags: ["root", "carrot", "radish", "plants", "pull", "earth"],
  durationSec: 0.6825, loopable: false, targetRmsDbfs: -25,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 8800 - params.distance * 5456 });
  },
} satisfies SoundRecipe;
