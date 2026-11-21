import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/jacket-movement-rustle.ts';

export default {
  id: 'jacket-movement-rustle', name: 'Jacket Movement Rustle', category: 'Footsteps & UI',
  tags: ['movement', 'clothes', 'jacket', 'equip', 'put', 'on', 'fabric', 'foley', 'cc0'],
  loopable: false, durationSec: 0.385, targetRmsDbfs: -31,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 9700 });
  },
} satisfies SoundRecipe;
