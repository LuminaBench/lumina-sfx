import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/hen-warning-call.ts';

export default {
  id: "hen-warning-call", name: "Hen Warning Call", category: "Animals",
  tags: ["hen", "chicken", "warning", "alarm", "call"],
  durationSec: 0.9434, loopable: false, targetRmsDbfs: -22,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 11200 - params.distance * 6944 });
  },
} satisfies SoundRecipe;
