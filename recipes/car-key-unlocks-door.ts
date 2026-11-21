import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-key-unlocks-door.ts';

export default {
  id: 'car-key-unlocks-door', name: 'Car Key Unlocking Door', category: 'Vehicles & Engines',
  tags: ['car', 'key', 'unlock', 'door', 'latch'], loopable: false, durationSec: 0.93,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -25,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.06 });
  },
} satisfies SoundRecipe;
