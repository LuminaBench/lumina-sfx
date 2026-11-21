import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/loose-gravel-landing.ts';

export default {
  id: 'loose-gravel-landing', name: 'Loose Gravel Landing', category: 'Footsteps & UI',
  tags: ['movement', 'gravel', 'land', 'jump', 'stones', 'crunch', 'shift', 'foley', 'cc0'],
  loopable: false, durationSec: 0.901, targetRmsDbfs: -24,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10300 });
  },
} satisfies SoundRecipe;
