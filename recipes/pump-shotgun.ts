import { mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import recording from './_recordings/clarity-field.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { discharge } from './_shared/mechanical.ts';

export default {
  id: 'pump-shotgun', name: "Heavy Pump Shotgun", category: 'Weapons',
  tags: ["shotgun","gunshot","heavy","buckshot"], loopable: false, durationSec: 0.92,
  recording: recording.credit,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.78 } },
  render(ctx, { params, seed }) {
    const sound = discharge(ctx, {
      span: 0.00252, low: 305, high: 1920, edge: 0.83,
      weight: 1.17 + params.weight * 0.88, tail: 0.53, presence: 1.12,
    });
    const take = renderRecording(ctx, recording, {
      seed, speed: 1.02 - params.weight * 0.16, cutoffHz: 8700 - params.weight * 1200,
    });
    mix(sound, take, 2.7);
    return sound;
  },
} satisfies SoundRecipe;
