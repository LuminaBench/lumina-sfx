import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/heavy-puddle-stomp.ts';

export default {
  id: 'heavy-puddle-stomp', name: 'Heavy Puddle Stomp', category: 'Footsteps & UI',
  tags: ['movement', 'heavy', 'stomp', 'splash', 'puddle', 'water', 'land', 'foley', 'cc0'],
  loopable: false, durationSec: 0.447, targetRmsDbfs: -23,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10700 });
  },
} satisfies SoundRecipe;
