import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/packed-snow-footstep.ts';

export default {
  id: 'packed-snow-footstep', name: 'Packed Snow Footstep', category: 'Footsteps & UI',
  tags: ['footstep', 'snow', 'winter', 'boot', 'step', 'walk', 'crunch', 'foley', 'cc0'],
  loopable: false, durationSec: 0.494, targetRmsDbfs: -28,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10600 });
  },
} satisfies SoundRecipe;
