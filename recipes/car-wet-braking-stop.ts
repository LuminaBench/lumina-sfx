import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-wet-braking-stop.ts';

export default {
  id: 'car-wet-braking-stop', name: 'Car Braking on Wet Road', category: 'Vehicles & Engines',
  tags: ['car', 'tire', 'brake', 'stop', 'wet'], loopable: false, durationSec: 2.35,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -22,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.046 });
  },
} satisfies SoundRecipe;
