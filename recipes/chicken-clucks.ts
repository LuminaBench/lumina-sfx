import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/chicken-clucks.ts';

export default {
  id: "chicken-clucks", name: "Chicken Clucks", category: 'Animals',
  tags: ["bird","chicken","hen","cluck","farm"], loopable: false, durationSec: 1.04,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.62 } },
  targetRmsDbfs: -22,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.984 + params.pace * 0.037, cutoffHz: 7800 });
  },
} satisfies SoundRecipe;
