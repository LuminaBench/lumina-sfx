import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/wooden-chest-latch-release.ts';

export default {
  perspective: "within reach", contains: ["latch release"], markers: {"accent": 0.41},
  id: 'wooden-chest-latch-release', name: 'Wooden Chest Latch Release', category: 'Props & Interactions',
  tags: ['chest', 'clasp', 'lock', 'latch', 'release', 'unlock', 'loot', 'foley', 'cc0'],
  loopable: false, durationSec: 0.635, targetRmsDbfs: -29,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10300 });
  },
} satisfies SoundRecipe;
