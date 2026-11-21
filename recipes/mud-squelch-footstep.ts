import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/mud-squelch-footstep.ts';

export default {
  id: 'mud-squelch-footstep', name: 'Mud Squelch Footstep', category: 'Footsteps & UI',
  tags: ['footstep', 'mud', 'wet', 'bog', 'squelch', 'boot', 'walk', 'foley', 'cc0'],
  loopable: false, durationSec: 0.594, targetRmsDbfs: -28,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 8300 });
  },
} satisfies SoundRecipe;
