import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/spade-wet-mud.ts';

export default {
  id: "spade-wet-mud", name: "Spade Lifting Wet Mud", category: "Farming",
  tags: ["spade", "mud", "wet", "soil", "squish"],
  durationSec: 0.2024, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 7900 - params.distance * 4898 });
  },
} satisfies SoundRecipe;
