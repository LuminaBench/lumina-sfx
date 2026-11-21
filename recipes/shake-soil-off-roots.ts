import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/shake-soil-off-roots.ts';

export default {
  id: "shake-soil-off-roots", name: "Shaking Soil off Roots", category: "Farming",
  tags: ["root", "harvest", "soil", "shake", "earth"],
  durationSec: 0.71, loopable: false, targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 6600 + params.force * 3300 });
  },
} satisfies SoundRecipe;
