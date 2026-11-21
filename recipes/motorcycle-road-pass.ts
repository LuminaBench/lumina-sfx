import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/motorcycle-road-pass.ts';

export default {
  id: 'motorcycle-road-pass', name: 'Motorcycle Passing on the Road', category: 'Vehicles & Engines',
  tags: ['motorcycle', 'drive-by', 'bike', 'engine', 'road'], loopable: false, durationSec: 4.17,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -22,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.05 });
  },
} satisfies SoundRecipe;
