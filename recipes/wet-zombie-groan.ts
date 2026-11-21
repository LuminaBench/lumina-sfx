import type { SoundRecipe } from '../engine/types.ts';
import { foleyGrain } from './_shared/foley.ts';
import { growledVoice } from './_shared/voice.ts';

export default {
  id: 'wet-zombie-groan', name: 'Wet Zombie Groan', category: 'Zombies & Combat',
  tags: ['zombie', 'groan', 'growl', 'angry', 'vocal', 'wet'], loopable: false, durationSec: 1.44,
  params: { rot: { label: 'Rot', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    const sound = growledVoice(ctx, [
      [0,     0.00,  97, 0.30, 0.25],
      [0.009, 0.28, 101, 0.45, 0.32],
      [0.042, 0.58, 111, 0.75, 0.44],
      [0.108, 0.90, 138, 0.93, 0.69],
      [0.213, 1.00, 146, 0.95, 0.79],
      [0.330, 0.79, 128, 0.88, 0.62],
      [0.447, 0.51, 106, 0.68, 0.38],
      [0.522, 0.33,  95, 0.45, 0.29],
      [0.598, 0.65, 119, 0.79, 0.53],
      [0.711, 0.99, 156, 0.94, 0.87],
      [0.799, 0.78, 141, 0.86, 0.72],
      [0.926, 0.63, 113, 0.73, 0.46],
      [1.039, 0.34,  92, 0.47, 0.30],
      [1.141, 0.14,  78, 0.14, 0.25],
      [1.266, 0.00,  76, 0.00, 0.16],
    ], { roughness: 0.63 + 0.36 * params.rot, brightness: 0.39 });
    for (let i = 0; i < 4; i++) {
      foleyGrain(ctx, sound, {
        at: 0.468 + ctx.random() * 0.189,
        center: 470 + ctx.random() * 650,
        edge: 1360 + ctx.random() * 930,
        duration: 0.0025 + ctx.random() * 0.0042,
        level: (0.016 + 0.053 * params.rot) * (0.52 + ctx.random() * 0.48),
      });
    }
    return sound;
  },
} satisfies SoundRecipe;
