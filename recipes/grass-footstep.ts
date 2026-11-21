import { biquad, layer } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { brush, foleyGrain, softContact } from './_shared/foley.ts';

export default {
  id: 'grass-footstep', name: 'Grass Footstep', category: 'Footsteps & UI',
  tags: ['footstep', 'grass', 'outdoor', 'walk'], loopable: false, durationSec: 0.47,
  params: { dryness: { label: 'Dryness', min: 0, max: 1, default: 0.55 } },
  targetRmsDbfs: -31,
  render(ctx, { params }) {
    const sound = new Float32Array(ctx.frames);
    const bend = 0.052 + ctx.random() * 0.036;
    const dry = params.dryness;
    layer(ctx, sound, 0, 0.195, (tips) =>
      brush(tips, 1070, 2410 + dry * 770, 0.014, 0.046, 0.22 + dry * 0.25), 0.54);
    layer(ctx, sound, 0.009 + bend * 0.37, 0.135, (earth) =>
      softContact(earth, { firmness: 0.06, texture: 0.025, length: 0.032 }), 0.21);
    layer(ctx, sound, bend, 0.245, (blades) =>
      brush(blades, 720 + 210 * dry, 2220 + dry * 680, 0.041, 0.059, 0.25 + 0.16 * dry), 0.44);
    for (let i = 0; i < 10; i++) {
      const t = ctx.random();
      foleyGrain(ctx, sound, {
        at: 0.011 + t * (0.092 + bend),
        center: 800 + ctx.random() * 1190,
        edge: 1740 + ctx.random() * 2740,
        duration: 0.004 + ctx.random() * 0.006,
        level: (0.026 + 0.11 * dry * ctx.random() ** 2) * (1 - 0.63 * t),
      });
    }
    const edge = biquad('lowpass', 2280 + dry * 1470, 0.70, ctx.sampleRate);
    return sound.map(edge);
  },
} satisfies SoundRecipe;
