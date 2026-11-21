import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/bottle-cork-pull.ts';

export default {
  id: 'bottle-cork-pull', name: 'Bottle Cork Pull', category: 'Props & Interactions',
  tags: ['bottle', 'cork', 'potion', 'open', 'pull', 'corkscrew', 'foley', 'cc0'],
  loopable: false, durationSec: 0.717, targetRmsDbfs: -26,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10000 });
  },
} satisfies SoundRecipe;
