import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-engine-shutdown.ts';

export default {
  id: 'car-engine-shutdown', name: 'Sedan Engine Shutdown', category: 'Vehicles & Engines',
  tags: ['car', 'engine', 'ignition', 'shutdown', 'sedan'], loopable: false, durationSec: 1.42,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -25,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.075 });
  },
} satisfies SoundRecipe;
