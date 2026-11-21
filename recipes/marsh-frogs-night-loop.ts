import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/marsh-frogs-night-loop.ts';

export default {
  id: "marsh-frogs-night-loop", name: "Marsh Frogs at Night", category: "Weather & Ambience",
  tags: ["frog", "marsh", "night", "pond", "ambience", "loop"],
  durationSec: 11.775, loopable: true, targetRmsDbfs: -29,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 9800 - params.distance * 6076 });
  },
} satisfies SoundRecipe;
