import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/backpack-zip-close.ts';

export default {
  id: 'backpack-zip-close', name: 'Backpack Zip Close', category: 'Props & Interactions',
  tags: ['backpack', 'pouch', 'zipper', 'cloth', 'close', 'inventory', 'foley', 'cc0'],
  loopable: false, durationSec: 0.659, targetRmsDbfs: -27,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10800 });
  },
} satisfies SoundRecipe;
