import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/rooster-crow.ts';

export default {
  id: "rooster-crow", name: "Rooster Crow", category: 'Animals',
  tags: ["bird","rooster","chicken","farm","crow"], loopable: false, durationSec: 2.25,
  params: { strain: { label: "Strain", min: 0, max: 1, default: 0.67 } },
  targetRmsDbfs: -20,
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.981 + params.strain * 0.031, cutoffHz: 11400 });
  },
} satisfies SoundRecipe;
