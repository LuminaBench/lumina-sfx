import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/leather-strap-flex.ts';

export default {
  id: 'leather-strap-flex', name: 'Leather Strap Flex', category: 'Props & Interactions',
  tags: ['leather', 'strap', 'belt', 'pouch', 'gear', 'equipment', 'creak', 'foley', 'cc0'],
  loopable: false, durationSec: 0.663, targetRmsDbfs: -31,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 9850 });
  },
} satisfies SoundRecipe;
