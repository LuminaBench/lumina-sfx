import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/watering-garden-soak.ts';

export default {
  id: "watering-garden-soak", name: "Watering a Garden Row", category: "Farming",
  tags: ["water", "garden", "splash", "plant", "watering"],
  durationSec: 1.915, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 10000 - params.distance * 6200 });
  },
} satisfies SoundRecipe;
