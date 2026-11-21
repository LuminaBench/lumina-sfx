import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/well-bucket-lower.ts';

export default {
  id: "well-bucket-lower", name: "Lowering the Well Bucket", category: "Farming",
  tags: ["well", "bucket", "rope", "lower", "splash"],
  durationSec: 2.06, loopable: false, targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 5700 + params.force * 2100 });
  },
} satisfies SoundRecipe;
