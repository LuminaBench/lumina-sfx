import type { SoundRecipe } from '../engine/types.ts';
import { biquad, envelope, noise, renderSamples } from '../engine/dsp.ts';

export default {
  id: 'melee-swing', name: "Melee Swing", category: 'Weapons',
  tags: ["melee","swing","whoosh","air"], loopable: false, durationSec: 0.43,
  mixRole: 'foley',
  params: { speed: { label: 'Speed', min: 0, max: 1, default: 0.67 } },
  render(ctx, { params }) {
    const air = noise(ctx.random, 'pink');
    const hiss = noise(ctx.random, 'white');
    const low = biquad('bandpass', 430, 0.75, ctx.sampleRate);
    const mid = biquad('bandpass', 1340, 0.92, ctx.sampleRate);
    const high = biquad('bandpass', 3800, 0.7, ctx.sampleRate);
    const attack = 0.09 - params.speed * 0.043;
    return renderSamples(ctx, (t) => {
      const turbulent = air();
      return 1.8 * envelope(t, attack, 0.043) * low(turbulent)
        + 1.1 * envelope(t, attack * 0.9, 0.031) * mid(turbulent)
        + 0.58 * envelope(t, attack * 0.79, 0.022) * high(hiss());
    });
  },
} satisfies SoundRecipe;
