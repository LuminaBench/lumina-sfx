import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-engine-idle-loop.ts';

export default {
  id: 'car-engine-idle-loop', name: 'Sedan Exhaust Idle', category: 'Vehicles & Engines',
  tags: ['car', 'engine', 'idle', 'exhaust', 'sedan'], loopable: true, durationSec: 3.1505669,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.24 } },
  targetRmsDbfs: -23,
  spectrum: [{ band: 'sub', minShare: 0.77 }],
  recording: recording.credit,
  render(ctx, { params }) {
    return renderRecording(ctx, recording, { cutoffHz: 10800 - params.distance * 7100 });
  },
} satisfies SoundRecipe;
