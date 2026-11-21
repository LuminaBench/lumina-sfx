import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/key-ring-jingle.ts';

export default {
  id: 'key-ring-jingle', name: 'Key Ring Jingle', category: 'Props & Interactions',
  tags: ['keys', 'ring', 'collect', 'pickup', 'metal', 'jingle', 'foley', 'cc0'],
  loopable: false, durationSec: 0.508, targetRmsDbfs: -30,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10700 });
  },
} satisfies SoundRecipe;
