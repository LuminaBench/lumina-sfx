import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-tire-skid-launch.ts';

export default {
  id: 'car-tire-skid-launch', name: 'Car Tire Skid Launch', category: 'Vehicles & Engines',
  tags: ['car', 'tire', 'squeal', 'skid', 'launch'], loopable: false, durationSec: 2.82,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -21,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.05 });
  },
} satisfies SoundRecipe;
