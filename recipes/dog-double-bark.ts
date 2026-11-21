import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/dog-double-bark.ts';

export default {
  id: "dog-double-bark", name: "Dog Double Bark", category: 'Animals',
  tags: ["dog","bark","pet","yard"], loopable: false, durationSec: 1.0,
  params: { size: { label: "Size", min: 0, max: 1, default: 0.66 } },
  targetRmsDbfs: -20,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 1.016 - params.size * 0.041, cutoffHz: 12000 });
  },
} satisfies SoundRecipe;
