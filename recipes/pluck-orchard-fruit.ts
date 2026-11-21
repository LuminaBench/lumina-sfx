import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import { farmFoley } from './_shared/farm-foley.ts';
import recording from './_recordings/snap-green-stalk.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "pluck-orchard-fruit", name: "Plucking Orchard Fruit", category: "Farming",
  tags: ["apple", "pear", "fruit", "pluck", "orchard", "harvest"],
  durationSec: .53, loopable: false, targetRmsDbfs: -26,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    const sound = farmFoley(ctx, params.force, [
      [0, 'leaf', .49, 3800, .057],
      [.078, 'snap', .53, 4200, .036],
      [.101, 'cloth', .37, 1460, .042],
    ]);
    mix(sound, renderRecording(ctx, recording, { seed }), .23);
    return sound;
  },
} satisfies SoundRecipe;
