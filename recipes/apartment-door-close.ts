import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/apartment-door-close.ts';

export default {
  id: 'apartment-door-close', name: 'Apartment Door Close', category: 'Props & Interactions',
  tags: ['door', 'apartment', 'closing', 'frame', 'brass', 'lock', 'latch', 'foley', 'cc0'],
  loopable: false, durationSec: 0.709, targetRmsDbfs: -23,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 9800 });
  },
} satisfies SoundRecipe;
