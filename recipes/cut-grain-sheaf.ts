import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import { farmFoley } from './_shared/farm-foley.ts';
import recording from './_recordings/bundle-dry-stalks.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "cut-grain-sheaf", name: "Sickle Cutting Stalks", category: "Farming",
  tags: ["sickle", "wheat", "grain", "sheaf", "cut", "harvest"],
  durationSec: .66, loopable: false, targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    const sound = farmFoley(ctx, params.force, [
      [0, 'leaf', .70, 4500, .064],
      [.044, 'metal', .14, 970, .039],
      [.106, 'snap', .36, 2200, .046],
      [.185, 'grain', .52, 2170, .065],
    ]);
    mix(sound, renderRecording(ctx, recording, { seed }), .36);
    return sound;
  },
} satisfies SoundRecipe;
