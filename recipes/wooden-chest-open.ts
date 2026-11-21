import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/wooden-chest-open.ts';

export default {
  id: 'wooden-chest-open', name: 'Wooden Chest Open', category: 'Props & Interactions',
  tags: ['chest', 'treasure', 'loot', 'lid', 'wood', 'open', 'foley', 'cc0'],
  loopable: false, durationSec: 0.916, targetRmsDbfs: -26,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 8800 });
  },
} satisfies SoundRecipe;
