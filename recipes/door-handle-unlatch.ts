import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/door-handle-unlatch.ts';

export default {
  id: 'door-handle-unlatch', name: 'Door Handle Unlatch', category: 'Props & Interactions',
  tags: ['door', 'knob', 'handle', 'unlatch', 'open', 'lock', 'click', 'foley', 'cc0'],
  loopable: false, durationSec: 0.421, targetRmsDbfs: -27,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10300 });
  },
} satisfies SoundRecipe;
