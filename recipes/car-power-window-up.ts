import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-power-window-up.ts';

export default {
  id: 'car-power-window-up', name: 'Car Power Window Raising', category: 'Vehicles & Engines',
  tags: ['car', 'window', 'closing', 'electric', 'cabin', 'glass'], loopable: false, durationSec: 3.87,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -26,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.065 });
  },
} satisfies SoundRecipe;
