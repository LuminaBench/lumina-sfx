import { biquad, layer } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { bodyImpact } from './_shared/combat.ts';
import { brush } from './_shared/foley.ts';
import { growledVoice } from './_shared/voice.ts';

export default {
  id: 'zombie-death-collapse', name: 'Zombie Death Collapse', category: 'Zombies & Combat',
  tags: ['zombie', 'death', 'collapse', 'vocal', 'impact', 'gasp'], loopable: false, durationSec: 1.52,
  params: { mass: { label: 'Mass', min: 0, max: 1, default: 0.72 } },
  render(ctx, { params }) {
    const sound = growledVoice(ctx, [
      [0,     0.00, 138, 0.44, 0.46],
      [0.009, 0.61, 154, 0.61, 0.63],
      [0.039, 1.00, 161, 0.91, 0.78],
      [0.084, 0.83, 133, 0.85, 0.66],
      [0.141, 0.51, 102, 0.54, 0.44],
      [0.178, 0.21,  88, 0.28, 0.35],
      [0.231, 0.26,  81, 0.17, 0.44],
      [0.278, 0.23,  78, 0.04, 0.36],
      [0.359, 0.00,  76, 0.00, 0.18],
    ], { roughness: 0.90, brightness: 0.66 });
    const fall = 0.372 + ctx.random() * 0.079;
    layer(ctx, sound, fall - 0.094, 0.30, (cloth) => brush(cloth, 821, 2390, 0.041, 0.052, 0.48), 0.57);
    layer(ctx, sound, fall, 0.25, (body) => {
      const floor = biquad('highpass', 96, 0.71, body.sampleRate);
      return bodyImpact(body, 0.48 + params.mass * 0.57, 0.11).map(floor);
    }, 0.47 + params.mass * 0.20);
    layer(ctx, sound, fall + 0.091, 0.26, (cloth) => brush(cloth, 690, 1990, 0.023, 0.044, 0.44), 0.38);
    return sound;
  },
} satisfies SoundRecipe;
