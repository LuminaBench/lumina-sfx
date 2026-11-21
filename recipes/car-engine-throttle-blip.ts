import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-engine-throttle-blip.ts';

export default {
  id: 'car-engine-throttle-blip', name: 'Sedan Throttle Blip', category: 'Vehicles & Engines',
  tags: ['car', 'engine', 'rev', 'throttle', 'sedan'], loopable: false, durationSec: 4.53,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -20,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.055 });
  },
} satisfies SoundRecipe;
