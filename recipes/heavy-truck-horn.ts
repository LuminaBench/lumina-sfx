import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/heavy-truck-horn.ts';

export default {
  id: 'heavy-truck-horn', name: 'Heavy Truck Horn', category: 'Vehicles & Engines',
  tags: ['truck', 'horn', 'traffic', 'heavy', 'road'], loopable: false, durationSec: 0.58,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -20,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.06 });
  },
} satisfies SoundRecipe;
