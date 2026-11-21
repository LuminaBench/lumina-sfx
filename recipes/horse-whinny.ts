import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/horse-whinny.ts';

export default {
  id: "horse-whinny", name: "Horse Whinny", category: 'Animals',
  tags: ["horse","whinny","neigh","farm"], loopable: false, durationSec: 2.1,
  params: { strain: { label: "Strain", min: 0, max: 1, default: 0.62 } },
  targetRmsDbfs: -20,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.988 + params.strain * 0.026, cutoffHz: 12700 });
  },
} satisfies SoundRecipe;
