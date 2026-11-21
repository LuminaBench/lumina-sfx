import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/sneaker-pivot-squeak.ts';

export default {
  id: 'sneaker-pivot-squeak', name: 'Sneaker Pivot Squeak', category: 'Footsteps & UI',
  tags: ['movement', 'sneakers', 'sole', 'rubber', 'tile', 'pivot', 'squeak', 'stop', 'foley', 'cc0'],
  loopable: false, durationSec: 0.397, targetRmsDbfs: -27,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10600 });
  },
} satisfies SoundRecipe;
