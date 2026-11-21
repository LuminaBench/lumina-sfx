import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/compact-car-horn.ts';

export default {
  id: 'compact-car-horn', name: 'Compact Car Horn', category: 'Vehicles & Engines',
  tags: ['car', 'horn', 'honk', 'traffic', 'road'], loopable: false, durationSec: 0.4,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -21,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.06 });
  },
} satisfies SoundRecipe;
