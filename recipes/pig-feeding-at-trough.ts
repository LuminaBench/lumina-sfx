import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/pig-feeding-at-trough.ts';

export default {
  id: "pig-feeding-at-trough", name: "Pig Eating at the Trough", category: "Animals",
  tags: ["pig", "eat", "feed", "trough", "close"],
  durationSec: 1.085, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 9600 - params.distance * 5952 });
  },
} satisfies SoundRecipe;
