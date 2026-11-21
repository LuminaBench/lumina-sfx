import type { SoundRecipe } from '../engine/types.ts';
import { biquad, envelope, mix, noise, punch, renderSamples, tone } from '../engine/dsp.ts';

export default {
  id: 'bullet-whiz', name: "Bullet Whiz", category: 'Weapons',
  tags: ["bullet","whiz","flyby","doppler"], loopable: false, durationSec: 0.34,
  params: { speed: { label: 'Speed', min: 0, max: 1, default: 0.67 } },
  render(ctx, { params }) {
    const arrival = 0.045 - params.speed * 0.022;
    const air = noise(ctx.random, 'pink');
    const filter = biquad('bandpass', 1600, 0.65, ctx.sampleRate);
    const path = (t: number) => envelope(t, arrival, 0.034);
    const sound = tone(ctx, (t) => 710 + 2860 / (1 + Math.exp((t - arrival) / 0.009)),
      (t) => 0.56 * path(t), (phase) => Math.sin(phase) + 0.27 * Math.sin(phase * 2));
    mix(sound, renderSamples(ctx, (t) => 1.35 * filter(air()) * path(t)));
    mix(sound, punch(ctx, [
      { color: 'white', kind: 'highpass', hz: 4900, gain: 0.62, attack: 0.0004, decay: 0.009 },
    ]));
    return sound;
  },
} satisfies SoundRecipe;
