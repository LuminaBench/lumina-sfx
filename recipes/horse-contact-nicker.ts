import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/horse-contact-nicker.ts';

export default {
  id: "horse-contact-nicker", name: "Horse Contact Call", category: "Animals",
  tags: ["horse", "nicker", "neigh", "stable", "call"],
  durationSec: 1.125, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 9500 - params.distance * 5890 });
  },
} satisfies SoundRecipe;
