import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/steel-drawer-shut.ts';

export default {
  id: 'steel-drawer-shut', name: 'Steel Drawer Shut', category: 'Props & Interactions',
  tags: ['drawers', 'metal', 'steel', 'cabinet', 'rail', 'storage', 'close', 'foley', 'cc0'],
  loopable: false, durationSec: 0.751, targetRmsDbfs: -24,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  spectrum: [{ band: 'high', minShare: 0.001 }],
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10000 });
  },
} satisfies SoundRecipe;
