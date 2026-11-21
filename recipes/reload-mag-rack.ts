import { biquad, layer } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { contact, scrape } from './_shared/mechanical.ts';

export default {
  id: 'reload-mag-rack', name: 'Reload · Mag In & Rack', category: 'Weapons',
  tags: ['reload', 'magazine', 'rack', 'mechanical', 'foley'], loopable: false, durationSec: 0.92,
  params: { weight: { label: 'Weight', min: 0, max: 1, default: 0.6 } },
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    const gripOffset = ctx.random() * 0.013;
    const slideOffset = 0.013 * (ctx.random() - 0.5);
    layer(ctx, sound, 0, 0.060, (detail) =>
      contact(detail, { body: 545, bright: 3100, damping: 0.0045 }), 0.28);
    layer(ctx, sound, 0.008, 0.084, (detail) => scrape(detail, 890, 0.067, 0.54), 0.78);
    layer(ctx, sound, 0.114 + gripOffset, 0.076, (detail) => scrape(detail, 1410, 0.063, 0.76), 0.68);
    layer(ctx, sound, 0.163 + gripOffset, 0.070, (detail) =>
      contact(detail, { body: 410, bright: 1780, damping: 0.010 }), 0.9 + params.weight * 0.36);
    layer(ctx, sound, 0.177 + gripOffset, 0.045, (detail) =>
      contact(detail, { body: 1050, bright: 4540, damping: 0.0052 }), 0.57);
    layer(ctx, sound, 0.318 + slideOffset, 0.121, (detail) => scrape(detail, 1840, 0.104, 1.13), 1.12);
    layer(ctx, sound, 0.395 + slideOffset, 0.065, (detail) =>
      contact(detail, { body: 835, bright: 3430, damping: 0.0075 }), 0.86);
    layer(ctx, sound, 0.430 + slideOffset, 0.083, (detail) => scrape(detail, 2100, 0.073, 0.88), 0.69);
    layer(ctx, sound, 0.488 + slideOffset, 0.080, (detail) =>
      contact(detail, { body: 592, bright: 3950, damping: 0.0089 }), 1.12);
    layer(ctx, sound, 0.501 + slideOffset, 0.032, (detail) =>
      contact(detail, { body: 900, bright: 2860, damping: 0.0033 }), 0.33);
    layer(ctx, sound, 0.557 + slideOffset, 0.137, (detail) => scrape(detail, 635, 0.119, 0.41), 0.38);
    const damp = biquad('lowpass', 710, 0.71, ctx.sampleRate);
    const detail = biquad('highpass', 3100, 0.71, ctx.sampleRate);
    return sound.map((sample) => sample - 0.38 * damp(sample) + 0.92 * detail(sample));
  },
} satisfies SoundRecipe;
