import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/quick-response-siren-loop.ts';

export default {
  id: "quick-response-siren-loop", name: "Quick Response Siren", category: "Sci-Fi & UI",
  tags: ["siren","alarm","fast","alert"], loopable: true, durationSec: 3.996,
  params: { edge: { label: "Edge", min: 0, max: 1, default: 0.64 } },
  targetRmsDbfs: -23,
  recording: recording.credit,
  render(ctx, { params }) {
    return renderRecording(ctx, recording, { cutoffHz: 3300 + params.edge * 4150 });
  },
} satisfies SoundRecipe;
