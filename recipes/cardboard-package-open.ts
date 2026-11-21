import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/cardboard-package-open.ts';

export default {
  id: 'cardboard-package-open', name: 'Cardboard Package Open', category: 'Props & Interactions',
  tags: ['cardboard', 'box', 'package', 'parcel', 'flap', 'unpack', 'foley', 'cc0'],
  loopable: false, durationSec: 0.557, targetRmsDbfs: -28,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 9800 });
  },
} satisfies SoundRecipe;
