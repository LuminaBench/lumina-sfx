import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/water-drops-from-spout.ts';

export default {
  id: "water-drops-from-spout", name: "Water Drops from a Spout", category: "Farming",
  tags: ["water", "drip", "spout", "watering-can", "drops"],
  durationSec: 0.91, loopable: false, targetRmsDbfs: -28,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 8600 + params.force * 2500 });
  },
} satisfies SoundRecipe;
