import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/icy-crust-footstep.ts';

export default {
  id: 'icy-crust-footstep', name: 'Icy Crust Footstep', category: 'Footsteps & UI',
  tags: ['footstep', 'ice', 'crust', 'frost', 'crack', 'boot', 'walk', 'foley', 'cc0'],
  loopable: false, durationSec: 0.581, targetRmsDbfs: -27,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10200 });
  },
} satisfies SoundRecipe;
