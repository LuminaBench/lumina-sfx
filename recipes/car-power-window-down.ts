import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-power-window-down.ts';

export default {
  id: 'car-power-window-down', name: 'Car Power Window Lowering', category: 'Vehicles & Engines',
  tags: ['car', 'window', 'opening', 'electric', 'cabin'], loopable: false, durationSec: 1.89,
  params: { pace: { label: 'Pace', min: 0, max: 1, default: 0.5 } },
  targetRmsDbfs: -25,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1 + (params.pace - 0.5) * 0.055 });
  },
} satisfies SoundRecipe;
