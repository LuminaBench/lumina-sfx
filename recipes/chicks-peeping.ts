import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/chicks-peeping.ts';

export default {
  id: "chicks-peeping", name: "Young Chicks Peeping", category: "Animals",
  tags: ["chicken", "chick", "peep", "bird", "farm", "young"],
  durationSec: 1.535, loopable: false, targetRmsDbfs: -25,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 12000 - params.distance * 7440 });
  },
} satisfies SoundRecipe;
