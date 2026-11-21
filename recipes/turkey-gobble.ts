import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/turkey-gobble.ts';

export default {
  id: "turkey-gobble", name: "Turkey Gobble", category: "Animals",
  tags: ["turkey", "gobble", "bird", "farm"],
  durationSec: 0.7957, loopable: false, targetRmsDbfs: -21,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 11200 - params.distance * 6944 });
  },
} satisfies SoundRecipe;
