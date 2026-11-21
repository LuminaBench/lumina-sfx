import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/bundle-dry-stalks.ts';

export default {
  id: "bundle-dry-stalks", name: "Gathering a Dry Sheaf", category: "Farming",
  tags: ["wheat", "straw", "sheaf", "husk", "dry"],
  durationSec: 0.905, loopable: false, targetRmsDbfs: -24,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 9300 - params.distance * 5766 });
  },
} satisfies SoundRecipe;
