import { layer } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { contact, scrape } from './_shared/mechanical.ts';

export default {
  id: 'shell-casing-drop', name: 'Shell Casing Drop', category: 'Weapons',
  tags: ['casing', 'shell', 'metal', 'bounce', 'brass'], loopable: false, durationSec: 0.66,
  params: { ring: { label: 'Ring', min: 0, max: 1, default: 0.6 } },
  spectrum: [{ band: 'high', minShare: 0.12 }],
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    let at = 0;
    let gap = 0.083 + ctx.random() * 0.036;
    let level = 1;
    for (let i = 0; i < 8; i++) {
      const position = ctx.random();
      const length = 0.012 + position * 0.009;
      layer(ctx, sound, at, 0.092, (bounce) => contact(bounce, {
        body: 1240 + position * 980, bright: 3580 + position * 2520,
        damping: length * (0.43 + params.ring * 0.45),
      }), level);
      at += gap;
      gap *= 0.59 + ctx.random() * 0.20;
      level *= 0.66 + ctx.random() * 0.17;
    }
    layer(ctx, sound, at - gap * 3, 0.11, (slide) => scrape(slide, 2830, 0.077, 0.88), 0.32);
    return sound;
  },
} satisfies SoundRecipe;
