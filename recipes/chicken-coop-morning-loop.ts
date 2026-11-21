import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/chicken-coop-morning-loop.ts';

export default {
  id: "chicken-coop-morning-loop", name: "Chicken Coop Morning", category: "Weather & Ambience",
  tags: ["coop", "chicken", "morning", "farm", "ambience", "loop"],
  durationSec: 9.125, loopable: true, targetRmsDbfs: -29,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 9800 - params.distance * 6076 });
  },
} satisfies SoundRecipe;
