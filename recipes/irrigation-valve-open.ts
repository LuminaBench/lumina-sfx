import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/irrigation-valve-open.ts';

export default {
  id: "irrigation-valve-open", name: "Opening an Irrigation Valve", category: "Farming",
  tags: ["irrigation", "valve", "open", "water", "lever"],
  durationSec: 1.06, loopable: false, targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 7200 + params.force * 3800 });
  },
} satisfies SoundRecipe;
