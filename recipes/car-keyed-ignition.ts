import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-keyed-ignition.ts';

export default {
  id: 'car-keyed-ignition', name: 'Car Key and Cabin Ignition', category: 'Vehicles & Engines',
  tags: ['car', 'engine', 'key', 'ignition', 'cabin'], loopable: false, durationSec: 1.94,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -23,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.07 });
  },
} satisfies SoundRecipe;
