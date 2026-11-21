import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/city-bus-engine-idle-loop.ts';

export default {
  id: 'city-bus-engine-idle-loop', name: 'Transit Bus Diesel Idle', category: 'Vehicles & Engines',
  tags: ['bus', 'diesel', 'engine', 'idle', 'transit'], loopable: true, durationSec: 3.7195011,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.24 } },
  targetRmsDbfs: -25,
  spectrum: [{ band: 'sub', minShare: 0.47 }],
  recording: recording.credit,
  render(ctx, { params }) {
    return renderRecording(ctx, recording, { cutoffHz: 10800 - params.distance * 7100 });
  },
} satisfies SoundRecipe;
