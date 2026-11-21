import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/physical-light-switch.ts';

export default {
  id: 'physical-light-switch', name: 'Physical Light Switch', category: 'Props & Interactions',
  tags: ['light', 'switch', 'wall', 'toggle', 'lamp', 'electrical', 'click', 'foley', 'cc0'],
  loopable: false, durationSec: 0.134, targetRmsDbfs: -30,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10900 });
  },
} satisfies SoundRecipe;
