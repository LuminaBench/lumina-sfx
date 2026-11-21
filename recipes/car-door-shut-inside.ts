import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-door-shut-inside.ts';

export default {
  id: 'car-door-shut-inside', name: 'Car Door Closing Inside', category: 'Vehicles & Engines',
  tags: ['car', 'door', 'shut', 'slam', 'cabin'], loopable: false, durationSec: 0.63,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -22,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.07 });
  },
} satisfies SoundRecipe;
