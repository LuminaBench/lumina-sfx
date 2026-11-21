import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import { farmFoley } from './_shared/farm-foley.ts';
import recording from './_recordings/bundle-dry-stalks.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "hoof-shift-straw", name: "Hoof Shifting on Straw", category: "Farming",
  tags: ["hoof", "horse", "straw", "bedding", "barn", "shift"],
  durationSec: .60, loopable: false, targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    const sound = farmFoley(ctx, params.force, [
      [0, 'wood', .66, 162, .048],
      [.009, 'earth', .48, 300, .038],
      [.1, 'leaf', .48, 3400, .077],
      [.157, 'grain', .30, 1910, .037],
    ]);
    mix(sound, renderRecording(ctx, recording, { seed }), .44);
    return sound;
  },
} satisfies SoundRecipe;
