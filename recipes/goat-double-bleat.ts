import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/goat-double-bleat.ts';

export default {
  id: "goat-double-bleat", name: "Goat Double Bleat", category: 'Animals',
  tags: ["goat","bleat","farm","livestock"], loopable: false, durationSec: 1.98,
  params: { nasal: { label: "Nasal", min: 0, max: 1, default: 0.69 } },
  targetRmsDbfs: -21,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 7920 + params.nasal * 3380 });
  },
} satisfies SoundRecipe;
