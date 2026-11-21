import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/seed-packet-rustle.ts';

export default {
  id: "seed-packet-rustle", name: "Paper Seed Packet Rustle", category: "Farming",
  tags: ["seed", "packet", "paper", "sow", "foley"],
  durationSec: 0.755, loopable: false, targetRmsDbfs: -26,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 9800 - params.distance * 6076 });
  },
} satisfies SoundRecipe;
