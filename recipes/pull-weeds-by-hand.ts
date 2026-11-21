import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/pull-weeds-by-hand.ts';

export default {
  id: "pull-weeds-by-hand", name: "Pulling a Handful of Weeds", category: "Farming",
  tags: ["weed", "pull", "grass", "fiber", "garden"],
  durationSec: 0.935, loopable: false, targetRmsDbfs: -26,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 10500 - params.distance * 6510 });
  },
} satisfies SoundRecipe;
