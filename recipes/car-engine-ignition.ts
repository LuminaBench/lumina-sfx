import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-engine-ignition.ts';

export default {
  id: 'car-engine-ignition', name: 'Sedan Engine Ignition', category: 'Vehicles & Engines',
  tags: ['car', 'engine', 'ignition', 'starter', 'sedan'], loopable: false, durationSec: 2.14,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -20,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.05 });
  },
} satisfies SoundRecipe;
