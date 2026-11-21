import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/spade-turn-loam.ts';

export default {
  id: "spade-turn-loam", name: "Spade Turning Loam", category: "Farming",
  tags: ["spade", "shovel", "dig", "loam", "tool"],
  durationSec: 0.7603, loopable: false, targetRmsDbfs: -22,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 9800 - params.distance * 6076 });
  },
} satisfies SoundRecipe;
