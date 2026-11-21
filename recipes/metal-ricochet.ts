import { biquad, envelope, layer, mix, noise, renderSamples } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { scatter } from './_shared/acoustics.ts';
import { contact } from './_shared/mechanical.ts';

export default {
  id: 'metal-ricochet', name: 'Metal Ricochet Ping', category: 'Weapons',
  tags: ['ricochet', 'metal', 'ping', 'spark'], loopable: false, durationSec: 0.57,
  params: { ring: { label: 'Ring', min: 0, max: 1, default: 0.73 } },
  spectrum: [{ band: 'high', minShare: 0.24 }],
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    const hit = contact({ ...ctx, frames: Math.round(ctx.sampleRate * 0.075) },
      { body: 2350, bright: 5580, damping: 0.0058 + 0.007 * params.ring });
    mix(sound, hit);
    scatter(ctx, sound, hit, 0.25, 0.5, 6150);
    layer(ctx, sound, 0.006 + ctx.random() * 0.006, 0.12, (shard) => {
      const crackle = noise(shard.random, 'white');
      const hi = biquad('bandpass', 7230, 5.2, shard.sampleRate);
      const lo = biquad('bandpass', 4080 + ctx.random() * 830, 6.8, shard.sampleRate);
      return renderSamples(shard, (t) => {
        const transition = Math.exp(-t / 0.024);
        const audio = crackle();
        return envelope(t, 0.0009, 0.019 + params.ring * 0.025) *
          (hi(audio) * transition + lo(audio) * (1 - transition));
      });
    }, 0.85);
    layer(ctx, sound, 0.032 + ctx.random() * 0.021, 0.033, (grain) =>
      contact(grain, { body: 1130, bright: 5100, damping: 0.0035 }), 0.35);
    return sound;
  },
} satisfies SoundRecipe;
