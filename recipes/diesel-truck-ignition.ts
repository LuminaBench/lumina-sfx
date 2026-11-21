import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/diesel-truck-ignition.ts';

export default {
  id: 'diesel-truck-ignition', name: 'Heavy Truck Diesel Ignition', category: 'Vehicles & Engines',
  tags: ['truck', 'diesel', 'engine', 'start', 'heavy'], loopable: false, durationSec: 3.56,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -20,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.06 });
  },
} satisfies SoundRecipe;
