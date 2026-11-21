import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/shallow-water-footstep.ts';

export default {
  id: 'shallow-water-footstep', name: 'Shallow Water Footstep', category: 'Footsteps & UI',
  tags: ['footstep', 'water', 'puddle', 'shallow', 'wade', 'splash', 'walk', 'foley', 'cc0'],
  loopable: false, durationSec: 0.51, targetRmsDbfs: -27,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10400 });
  },
} satisfies SoundRecipe;
