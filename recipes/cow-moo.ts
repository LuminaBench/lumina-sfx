import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/cow-moo.ts';

export default {
  id: "cow-moo", name: "Cow Moo", category: 'Animals',
  tags: ["cow","cattle","moo","farm"], loopable: false, durationSec: 2.28,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.64 } },
  targetRmsDbfs: -20,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1.023 - params.weight * 0.044, cutoffHz: 10400 });
  },
} satisfies SoundRecipe;
