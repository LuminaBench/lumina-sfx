import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/coin-pile-drop.ts';

export default {
  id: 'coin-pile-drop', name: 'Coin Pile Drop', category: 'Props & Interactions',
  tags: ['coins', 'money', 'currency', 'payment', 'cash', 'drop', 'table', 'foley', 'cc0'],
  loopable: false, durationSec: 1.121, targetRmsDbfs: -25,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10800 });
  },
} satisfies SoundRecipe;
