import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import { farmFoley } from './_shared/farm-foley.ts';
import recording from './_recordings/bundle-dry-stalks.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "corn-husk-peel", name: "Peeling a Dry Corn Husk", category: "Farming",
  tags: ["corn", "husk", "peel", "dry", "harvest"],
  durationSec: .73, loopable: false, targetRmsDbfs: -25,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    const sound = farmFoley(ctx, params.force, [
      [0, 'leaf', .54, 3700, .061],
      [.097, 'snap', .54, 2700, .057],
      [.198, 'leaf', .63, 4050, .069],
      [.297, 'snap', .48, 3400, .048],
      [.378, 'cloth', .33, 1910, .054],
    ]);
    mix(sound, renderRecording(ctx, recording, { seed }), .42);
    return sound;
  },
} satisfies SoundRecipe;
