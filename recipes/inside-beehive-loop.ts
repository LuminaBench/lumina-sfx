import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/inside-beehive-loop.ts';

export default {
  id: "inside-beehive-loop", name: "Inside a Beehive", category: "Weather & Ambience",
  tags: ["bee", "hive", "buzz", "pollinator", "ambience", "loop"],
  durationSec: 8.025, loopable: true, targetRmsDbfs: -31,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 8650 - params.distance * 5363 });
  },
} satisfies SoundRecipe;
