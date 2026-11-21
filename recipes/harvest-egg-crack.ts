import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/harvest-egg-crack.ts';

export default {
  id: "harvest-egg-crack", name: "Fresh Egg Cracking Open", category: "Farming",
  tags: ["egg", "crack", "shell", "chicken", "kitchen"],
  durationSec: 0.5557, loopable: false, targetRmsDbfs: -25,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 11500 - params.distance * 7130 });
  },
} satisfies SoundRecipe;
