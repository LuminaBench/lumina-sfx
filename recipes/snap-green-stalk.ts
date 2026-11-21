import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/snap-green-stalk.ts';

export default {
  id: "snap-green-stalk", name: "Snapping a Green Stalk", category: "Farming",
  tags: ["stem", "snap", "green", "harvest", "stalk", "celery"],
  durationSec: 0.2401, loopable: false, targetRmsDbfs: -25,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 13000 - params.distance * 8060 });
  },
} satisfies SoundRecipe;
