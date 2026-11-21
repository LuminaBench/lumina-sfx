import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/rake-leaf-pile.ts';

export default {
  id: "rake-leaf-pile", name: "Raking a Dry Leaf Pile", category: "Farming",
  tags: ["rake", "leaves", "dry", "gardening", "tool"],
  durationSec: 0.7945, loopable: false, targetRmsDbfs: -25,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 10800 - params.distance * 6696 });
  },
} satisfies SoundRecipe;
