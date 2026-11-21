import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/key-turn-in-lock.ts';

export default {
  id: 'key-turn-in-lock', name: 'Key Turn in Lock', category: 'Props & Interactions',
  tags: ['keys', 'lock', 'unlock', 'turn', 'door', 'latch', 'cylinder', 'foley', 'cc0'],
  loopable: false, durationSec: 0.756, targetRmsDbfs: -28,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10500 });
  },
} satisfies SoundRecipe;
