import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/ceramic-mug-set-down.ts';

export default {
  id: 'ceramic-mug-set-down', name: 'Ceramic Mug Set Down', category: 'Props & Interactions',
  tags: ['cup', 'ceramic', 'mug', 'table', 'place', 'kitchen', 'foley', 'cc0'],
  loopable: false, durationSec: 0.282, targetRmsDbfs: -28,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10600 });
  },
} satisfies SoundRecipe;
