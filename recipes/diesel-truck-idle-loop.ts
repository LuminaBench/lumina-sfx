import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/diesel-truck-idle-loop.ts';

export default {
  id: 'diesel-truck-idle-loop', name: 'Heavy Truck Diesel Idle', category: 'Vehicles & Engines',
  tags: ['truck', 'diesel', 'engine', 'idle', 'heavy'], loopable: true, durationSec: 4.1437642,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.24 } },
  targetRmsDbfs: -23,
  spectrum: [{ band: 'sub', minShare: 0.075 }],
  recording: recording.credit,
  render(ctx, { params }) {
    return renderRecording(ctx, recording, { cutoffHz: 10800 - params.distance * 7100 });
  },
} satisfies SoundRecipe;
