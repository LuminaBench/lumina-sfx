import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/donkey-bray.ts';

export default {
  id: "donkey-bray", name: "Donkey Bray", category: "Animals",
  tags: ["donkey", "bray", "hee-haw", "farm", "animal"],
  durationSec: 2.1951, loopable: false, targetRmsDbfs: -22,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 10800 - params.distance * 6696 });
  },
} satisfies SoundRecipe;
