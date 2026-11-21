import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import recording from './_recordings/clarity-pistol.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { discharge } from './_shared/mechanical.ts';

export default {
  id: 'pistol-9mm', name: "9mm Pistol", category: 'Weapons',
  tags: ["pistol","gunshot","sidearm","short"], loopable: false, durationSec: 0.43,
  recording: recording.credit,
  params: { snap: { label: 'Snap', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params, seed }) {
    const sound = discharge(ctx, {
      span: 0.00089, low: 820, high: 3300, edge: 0.83 + params.snap * 0.46,
      weight: 0.64, tail: 0.23, presence: 0.72,
    });
    const take = renderRecording(ctx, recording, {
      seed, speed: 0.90 + params.snap * 0.08, cutoffHz: 5600 + params.snap * 6100,
    });
    mix(sound, take, 1.65);
    return sound;
  },
} satisfies SoundRecipe;
