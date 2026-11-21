import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/tractor-diesel-pullaway.ts';

export default {
  id: 'tractor-diesel-pullaway', name: 'Tractor Pullaway', category: 'Vehicles & Engines',
  tags: ['tractor', 'farm', 'diesel', 'driving', 'pullaway'], loopable: false, durationSec: 2.89,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -23,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.045 });
  },
} satisfies SoundRecipe;
