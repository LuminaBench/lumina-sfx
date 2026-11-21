import { biquad, mix } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { carCollision } from './_shared/collisions.ts';
import recording from './_recordings/car-bumper-bump.ts';

export default {
  id: "car-bumper-bump", name: "Car Bumper Bump", category: "Vehicles & Engines",
  tags: ["car","crash","collision","bumper"], loopable: false, durationSec: 0.86,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.64 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    const sound = renderRecording(ctx, recording, { seed, cutoffHz: 3800 - params.weight * 1220 });
    const body = carCollision(ctx, 'bump', params.weight);
    mix(sound, body.map(biquad('lowpass', 610, 0.72, ctx.sampleRate)), 0.69);
    return sound;
  },
} satisfies SoundRecipe;
