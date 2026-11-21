import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/trowel-soft-soil.ts';

export default {
  id: "trowel-soft-soil", name: "Trowel into Soft Soil", category: "Farming",
  tags: ["trowel", "soil", "planting", "potting", "dig"],
  durationSec: 0.6988, loopable: false, targetRmsDbfs: -25,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 7600 - params.distance * 4712 });
  },
} satisfies SoundRecipe;
