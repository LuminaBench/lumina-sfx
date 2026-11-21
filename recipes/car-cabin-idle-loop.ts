import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-cabin-idle-loop.ts';

export default {
  id: 'car-cabin-idle-loop', name: 'Sedan Cabin Idle', category: 'Vehicles & Engines',
  tags: ['car', 'engine', 'idle', 'cabin', 'sedan'], loopable: true, durationSec: 2.9362812,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.24 } },
  targetRmsDbfs: -28,
  spectrum: [{ band: 'sub', minShare: 0.81 }],
  recording: recording.credit,
  render(ctx, { params }) {
    return renderRecording(ctx, recording, { cutoffHz: 10800 - params.distance * 7100 });
  },
} satisfies SoundRecipe;
