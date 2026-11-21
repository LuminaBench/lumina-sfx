import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/pig-grunts.ts';

export default {
  id: "pig-grunts", name: "Pig Grunts", category: 'Animals',
  tags: ["pig","snort","grunt","farm"], loopable: false, durationSec: 1.19,
  params: { grit: { label: "Grit", min: 0, max: 1, default: 0.71 } },
  targetRmsDbfs: -21,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 6020 + params.grit * 6100 });
  },
} satisfies SoundRecipe;
