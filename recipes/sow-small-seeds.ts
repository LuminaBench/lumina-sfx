import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import { farmFoley } from './_shared/farm-foley.ts';
import recording from './_recordings/seed-packet-rustle.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "sow-small-seeds", name: "Small Seeds Scattered into Soil", category: "Farming",
  tags: ["seed", "planting", "sow", "soil", "scatter"],
  durationSec: .37, loopable: false, targetRmsDbfs: -27,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    const sound = farmFoley(ctx, params.force, [
      [0, 'grain', .8, 4900, .034],
      [.018, 'earth', .19, 540, .026],
      [.084, 'grain', .42, 3400, .065],
    ]);
    mix(sound, renderRecording(ctx, recording, { seed }), .12);
    return sound;
  },
} satisfies SoundRecipe;
