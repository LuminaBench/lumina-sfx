import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/trim-sod-edge.ts';

export default {
  id: "trim-sod-edge", name: "Spade Cutting Sod", category: "Farming",
  tags: ["sod", "grass", "shovel", "root", "soil"],
  durationSec: 0.7408, loopable: false, targetRmsDbfs: -23,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 9800 - params.distance * 6076 });
  },
} satisfies SoundRecipe;
