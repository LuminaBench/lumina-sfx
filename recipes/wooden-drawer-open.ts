import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/wooden-drawer-open.ts';

export default {
  id: 'wooden-drawer-open', name: 'Wooden Drawer Open', category: 'Props & Interactions',
  tags: ['drawers', 'slide', 'wooden', 'furniture', 'desk', 'storage', 'open', 'foley', 'cc0'],
  loopable: false, durationSec: 1.045, targetRmsDbfs: -27,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 8800 });
  },
} satisfies SoundRecipe;
