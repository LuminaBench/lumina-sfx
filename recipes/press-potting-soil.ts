import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/press-potting-soil.ts';

export default {
  id: "press-potting-soil", name: "Pressing Damp Potting Soil", category: "Farming",
  tags: ["soil", "press", "potting", "damp", "quiet"],
  durationSec: 0.355, loopable: false, targetRmsDbfs: -27,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 6500 - params.distance * 4030 });
  },
} satisfies SoundRecipe;
