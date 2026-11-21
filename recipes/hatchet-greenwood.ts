import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/hatchet-greenwood.ts';

export default {
  id: "hatchet-greenwood", name: "Hatchet Bite into Greenwood", category: "Farming",
  tags: ["hatchet", "wood", "log", "tool", "chop"],
  durationSec: 0.1277, loopable: false, targetRmsDbfs: -22,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 11800 - params.distance * 7316 });
  },
} satisfies SoundRecipe;
