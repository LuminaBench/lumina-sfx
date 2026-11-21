import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/book-page-turn.ts';

export default {
  id: 'book-page-turn', name: 'Book Page Turn', category: 'Props & Interactions',
  tags: ['paper', 'book', 'journal', 'map', 'page', 'turn', 'flip', 'foley', 'cc0'],
  loopable: false, durationSec: 0.451, targetRmsDbfs: -29,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10400 });
  },
} satisfies SoundRecipe;
