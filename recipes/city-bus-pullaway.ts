import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/city-bus-pullaway.ts';

export default {
  id: 'city-bus-pullaway', name: 'City Bus Pullaway', category: 'Vehicles & Engines',
  tags: ['bus', 'transit', 'pullaway', 'drive', 'diesel'], loopable: false, durationSec: 5.12,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -24,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.035 });
  },
} satisfies SoundRecipe;
