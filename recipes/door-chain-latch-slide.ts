import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/door-chain-latch-slide.ts';

export default {
  id: 'door-chain-latch-slide', name: 'Door Chain Latch Slide', category: 'Props & Interactions',
  tags: ['lock', 'chain', 'bolt', 'slide', 'door', 'metal', 'foley', 'cc0'],
  loopable: false, durationSec: 0.37, targetRmsDbfs: -28,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10600 });
  },
} satisfies SoundRecipe;
