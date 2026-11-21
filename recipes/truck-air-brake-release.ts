import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/truck-air-brake-release.ts';

export default {
  id: 'truck-air-brake-release', name: 'Truck Air Brake Release', category: 'Vehicles & Engines',
  tags: ['truck', 'pneumatic', 'air-brake', 'hiss', 'diesel'], loopable: false, durationSec: 1.51,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -21,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.07 });
  },
} satisfies SoundRecipe;
