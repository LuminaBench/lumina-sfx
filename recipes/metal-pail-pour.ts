import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/metal-pail-pour.ts';

export default {
  id: "metal-pail-pour", name: "Water Poured into a Metal Pail", category: "Farming",
  tags: ["bucket", "pail", "water", "metal", "pour"],
  durationSec: 1.515, loopable: false, targetRmsDbfs: -23,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 11500 - params.distance * 7130 });
  },
} satisfies SoundRecipe;
