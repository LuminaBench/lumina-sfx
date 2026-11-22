import { biquad, envelope, layer, noise, renderSamples } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { rumble } from './_shared/acoustics.ts';

export default {
  id: 'flight-missile-away-from-canopy',
  name: 'Missile away past canopy',
  category: 'Missiles',
  mixRole: 'impact',
  isolation: 'isolated',
  tags: ['dogfight', 'missile', 'launch', 'canopy', 'departure'],
  durationSec: 1.36,
  loopable: false,
  targetRmsDbfs: -23,
  params: { force: { label: 'Flyaway energy', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    const plume = noise(ctx.random, 'pink');
    const bright = biquad('bandpass', 2360 + params.force * 800, 0.72, ctx.sampleRate);
    const far = biquad('lowpass', 690, 0.68, ctx.sampleRate);
    const lug = biquad('bandpass', 490, 1.8, ctx.sampleRate);
    const out = renderSamples(ctx, (t) => {
      const x = plume(),
        near = Math.exp(-t / 0.24),
        edge = ctx.random() * 2 - 1;
      return (
        lug(edge) * envelope(t, 0.0004, 0.014) +
        envelope(t, 0.026, 0.25 + 0.14 * params.force) * (1.5 * near * bright(x) + 2.8 * (1 - near) * far(x))
      );
    });
    layer(ctx, out, 0.012, 0.59, (p) => rumble(p, 210, 0.013, 0.14, 0.4), 0.92);
    return out;
  },
} satisfies SoundRecipe;
