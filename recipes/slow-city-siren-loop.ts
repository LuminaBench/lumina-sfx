import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/slow-city-siren-loop.ts';

export default {
  id: "slow-city-siren-loop", name: "Slow City Siren", category: "Sci-Fi & UI",
  tags: ["siren","alert","city","slow"], loopable: true, durationSec: 4.6262,
  params: { distance: { label: "Distance", min: 0, max: 1, default: 0.4 } },
  targetRmsDbfs: -23,
  recording: recording.credit,
  render(ctx, { params }) {
    return renderRecording(ctx, recording, { cutoffHz: 6750 - params.distance * 4240 });
  },
} satisfies SoundRecipe;
