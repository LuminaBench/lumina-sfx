import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/small-motorbike-road-pass.ts';

export default {
  id: 'small-motorbike-road-pass', name: 'Small Motorbike Passing', category: 'Vehicles & Engines',
  tags: ['motorbike', 'drive-by', 'small', 'engine', 'road'], loopable: false, durationSec: 3.98,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -23,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.05 });
  },
} satisfies SoundRecipe;
