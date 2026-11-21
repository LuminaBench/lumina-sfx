import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/eggshell-pinch.ts';

export default {
  id: "eggshell-pinch", name: "Crushed Eggshell", category: "Farming",
  tags: ["egg", "shell", "crunch", "chicken", "pinch"],
  durationSec: 0.6242, loopable: false, targetRmsDbfs: -26,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 13000 - params.distance * 8060 });
  },
} satisfies SoundRecipe;
