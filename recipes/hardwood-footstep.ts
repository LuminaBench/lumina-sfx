import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/hardwood-footstep.ts';

export default {
  id: 'hardwood-footstep', name: 'Hardwood Floor Footstep', category: 'Footsteps & UI',
  contains: ['single complete indoor footstep'], perspective: 'inside a house',
  tags: ['floor', 'indoor', 'single', 'footstep', 'wood', 'boards', 'heel', 'shoe', 'walk', 'foley', 'cc0'],
  loopable: false, durationSec: 0.272, targetRmsDbfs: -24,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 8500 });
  },
} satisfies SoundRecipe;
