import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import { farmFoley } from './_shared/farm-foley.ts';
import recording from './_recordings/bundle-dry-stalks.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "shake-straw-bedding", name: "Shaking Straw into Stall Bedding", category: "Farming",
  tags: ["straw", "bedding", "stall", "barn", "shake"],
  durationSec: .89, loopable: false, targetRmsDbfs: -26,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    const sound = farmFoley(ctx, params.force, [
      [0, 'leaf', .61, 3620, .079],
      [.12, 'grain', .57, 2440, .069],
      [.221, 'leaf', .47, 3960, .077],
      [.38, 'grain', .31, 2040, .076],
    ]);
    mix(sound, renderRecording(ctx, recording, { seed }), .52);
    return sound;
  },
} satisfies SoundRecipe;
