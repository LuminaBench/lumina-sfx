import type { SoundRecipe } from '../engine/types.ts';
import { growledVoice } from './_shared/voice.ts';

export default {
  id: 'aggressive-zombie-snarl', name: 'Aggressive Zombie Snarl', category: 'Zombies & Combat',
  tags: ['zombie', 'snarl', 'growl', 'angry', 'vocal', 'attack'], loopable: false, durationSec: 0.88,
  params: { rage: { label: 'Rage', min: 0, max: 1, default: 0.81 } },
  render(ctx, { params }) {
    const pitch = 143 + 37 * params.rage;
    return growledVoice(ctx, [
      [0,     0.00,  125, 0.32, 0.43],
      [0.007, 0.54,  139, 0.60, 0.65],
      [0.045, 1.00, pitch, 0.93, 0.91],
      [0.119, 0.97, pitch - 7, 0.95, 0.83],
      [0.221, 0.75,  137, 0.81, 0.67],
      [0.295, 0.43,  116, 0.52, 0.42],
      [0.349, 0.65,  137, 0.69, 0.58],
      [0.423, 0.80,  152, 0.88, 0.71],
      [0.506, 0.49,  120, 0.54, 0.44],
      [0.612, 0.21,   91, 0.12, 0.29],
      [0.723, 0.00,   82, 0.00, 0.18],
    ], { roughness: 0.72 + params.rage * 0.27, brightness: 0.51 + params.rage * 0.22 });
  },
} satisfies SoundRecipe;
