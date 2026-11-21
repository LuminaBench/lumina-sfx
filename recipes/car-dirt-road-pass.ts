import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-dirt-road-pass.ts';

export default {
  id: 'car-dirt-road-pass', name: 'Car Passing on a Dirt Road', category: 'Vehicles & Engines',
  tags: ['car', 'drive-by', 'dirt', 'gravel', 'tires'], loopable: false, durationSec: 3.78,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -23,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.047 });
  },
} satisfies SoundRecipe;
