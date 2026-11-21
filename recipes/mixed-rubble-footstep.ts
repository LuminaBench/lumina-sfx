import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/mixed-rubble-footstep.ts';

export default {
  id: 'mixed-rubble-footstep', name: 'Mixed Rubble Footstep', category: 'Footsteps & UI',
  tags: ['footstep', 'rubble', 'debris', 'creak', 'wood', 'metal', 'walk', 'foley', 'cc0'],
  loopable: false, durationSec: 0.56, targetRmsDbfs: -25,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  recording: recording.credit,
  spectrum: [{ band: 'high', minShare: 0.001 }],
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + 0.06 * params.pace, cutoffHz: 10100 });
  },
} satisfies SoundRecipe;
