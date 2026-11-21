import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/geese-warning-flock.ts';

export default {
  id: "geese-warning-flock", name: "Geese Honking in a Flock", category: "Animals",
  tags: ["goose", "geese", "flock", "warning", "honk"],
  durationSec: 1.695, loopable: false, targetRmsDbfs: -23,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 10300 - params.distance * 6386 });
  },
} satisfies SoundRecipe;
