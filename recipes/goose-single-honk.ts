import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/goose-single-honk.ts';

export default {
  id: "goose-single-honk", name: "Goose Single Honk", category: "Animals",
  tags: ["goose", "honk", "bird", "farm", "call"],
  durationSec: 0.4351, loopable: false, targetRmsDbfs: -22,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 10400 - params.distance * 6448 });
  },
} satisfies SoundRecipe;
