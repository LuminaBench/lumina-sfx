import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/irrigation-valve-shut.ts';

export default {
  id: "irrigation-valve-shut", name: "Closing an Irrigation Valve", category: "Farming",
  tags: ["irrigation", "valve", "close", "water", "lever"],
  durationSec: 0.68, loopable: false, targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 6650 + params.force * 3100 });
  },
} satisfies SoundRecipe;
