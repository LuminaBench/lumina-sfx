import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/plant-large-seeds.ts';

export default {
  id: "plant-large-seeds", name: "Large Seeds Dropped by Hand", category: "Farming",
  tags: ["bean", "seed", "planting", "drop", "hand"],
  durationSec: 0.62, loopable: false, targetRmsDbfs: -26,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 5550 + params.force * 1250 });
  },
} satisfies SoundRecipe;
