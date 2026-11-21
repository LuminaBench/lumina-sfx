import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-wet-asphalt-pass.ts';

export default {
  id: 'car-wet-asphalt-pass', name: 'Car Passing on Wet Asphalt', category: 'Vehicles & Engines',
  tags: ['car', 'drive-by', 'wet', 'asphalt', 'tires'], loopable: false, durationSec: 4.01,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -23,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.04 });
  },
} satisfies SoundRecipe;
