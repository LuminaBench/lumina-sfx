import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-wiper-rain-loop.ts';

export default {
  id: 'car-wiper-rain-loop', name: 'Windshield Wipers in Rain', category: 'Vehicles & Engines',
  tags: ['car', 'wipers', 'rain', 'windshield', 'cabin'], loopable: true, durationSec: 3.4601361,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.24 } },
  targetRmsDbfs: -27,
  recording: recording.credit,
  render(ctx, { params }) {
    return renderRecording(ctx, recording, { cutoffHz: 10800 - params.distance * 7100 });
  },
} satisfies SoundRecipe;
