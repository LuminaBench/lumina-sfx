import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import { farmFoley } from './_shared/farm-foley.ts';
import recording from './_recordings/hatchet-greenwood.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "drive-fence-stake", name: "Driving a Wooden Fence Stake", category: "Farming",
  tags: ["fence", "stake", "hammer", "wood", "build", "tool"],
  durationSec: .67, loopable: false, targetRmsDbfs: -22,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    const sound = farmFoley(ctx, params.force, [
      [0, 'wood', .78, 168, .081],
      [.008, 'snap', .58, 3650, .025],
      [.083, 'wood', .30, 326, .043],
      [.172, 'earth', .40, 457, .09],
      [.24, 'grain', .28, 2140, .047],
    ]);
    mix(sound, renderRecording(ctx, recording, { seed }), .27);
    return sound;
  },
} satisfies SoundRecipe;
