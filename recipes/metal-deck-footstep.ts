import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/metal-deck-footstep.ts';

export default {
  id: 'metal-deck-footstep', name: 'Metal Deck Footstep', category: 'Footsteps & UI',
  tags: ['footstep', 'metal', 'deck', 'steel', 'grate', 'boot', 'walk', 'foley', 'cc0'],
  loopable: false, durationSec: 0.504, targetRmsDbfs: -24,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  spectrum: [{ band: 'high', minShare: 0.004 }],
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10100 });
  },
} satisfies SoundRecipe;
