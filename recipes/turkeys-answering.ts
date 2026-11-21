import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/turkeys-answering.ts';

export default {
  id: "turkeys-answering", name: "Turkeys Calling Together", category: "Animals",
  tags: ["turkey", "gobble", "flock", "coop", "answer"],
  durationSec: 1.105, loopable: false, targetRmsDbfs: -23,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 12400 - params.distance * 7688 });
  },
} satisfies SoundRecipe;
