import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-central-lock.ts';

export default {
  id: 'car-central-lock', name: 'Car Central-Lock Clunk', category: 'Vehicles & Engines',
  tags: ['car', 'central-lock', 'lock', 'solenoid', 'cabin'], loopable: false, durationSec: 0.44,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -24,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.065 });
  },
} satisfies SoundRecipe;
