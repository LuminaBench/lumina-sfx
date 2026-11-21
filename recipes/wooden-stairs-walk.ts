import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/wooden-stairs-walk.ts';

export default {
  id: 'wooden-stairs-walk', name: 'Walking Up Wooden Stairs', category: 'Footsteps & UI',
  tags: ['movement', 'stairs', 'stairway', 'walk', 'wood', 'sequence', 'footsteps', 'foley', 'cc0'],
  loopable: false, durationSec: 2.928, targetRmsDbfs: -26,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 8300 });
  },
} satisfies SoundRecipe;
