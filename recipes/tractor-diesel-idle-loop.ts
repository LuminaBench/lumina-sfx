import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/tractor-diesel-idle-loop.ts';

export default {
  id: 'tractor-diesel-idle-loop', name: 'Tractor Low Diesel Idle', category: 'Vehicles & Engines',
  tags: ['tractor', 'farm', 'diesel', 'engine', 'idle'], loopable: true, durationSec: 3.1834467,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.24 } },
  targetRmsDbfs: -24,
  spectrum: [{ band: 'sub', minShare: 0.22 }],
  recording: recording.credit,
  render(ctx, { params }) {
    return renderRecording(ctx, recording, { cutoffHz: 10800 - params.distance * 7100 });
  },
} satisfies SoundRecipe;
