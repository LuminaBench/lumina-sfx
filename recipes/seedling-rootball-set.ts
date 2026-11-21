import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import { farmFoley } from './_shared/farm-foley.ts';
import recording from './_recordings/trowel-soft-soil.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "seedling-rootball-set", name: "Setting a Seedling Root Ball", category: "Farming",
  tags: ["seedling", "transplant", "root", "plant", "soil"],
  durationSec: .62, loopable: false, targetRmsDbfs: -26,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    const sound = farmFoley(ctx, params.force, [
      [0, 'earth', .78, 355, .049],
      [.013, 'leaf', .28, 3100, .069],
      [.19, 'grain', .30, 1900, .046],
    ]);
    mix(sound, renderRecording(ctx, recording, { seed }), .36);
    return sound;
  },
} satisfies SoundRecipe;
