import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/sheep-bell-jingle.ts';

export default {
  id: "sheep-bell-jingle", name: "Sheep Bell Jingle", category: "Farming",
  tags: ["sheep", "bell", "pasture", "livestock", "jingle"],
  durationSec: 1.075, loopable: false, targetRmsDbfs: -25,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 10500 - params.distance * 6510 });
  },
} satisfies SoundRecipe;
