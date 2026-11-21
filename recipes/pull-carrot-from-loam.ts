import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/pull-carrot-from-loam.ts';

export default {
  id: "pull-carrot-from-loam", name: "Pulling a Carrot from Loam", category: "Farming",
  tags: ["carrot", "root", "pull", "harvest", "soil"],
  durationSec: 0.43, loopable: false, targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 6800 + params.force * 3300 });
  },
} satisfies SoundRecipe;
