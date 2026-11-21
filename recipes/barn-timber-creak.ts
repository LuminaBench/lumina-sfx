import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/barn-timber-creak.ts';

export default {
  id: "barn-timber-creak", name: "Heavy Barn Timber Creak", category: "Farming",
  tags: ["barn", "wood", "door", "creak", "heavy"],
  durationSec: 1.355, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 8800 - params.distance * 5456 });
  },
} satisfies SoundRecipe;
