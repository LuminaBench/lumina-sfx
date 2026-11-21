import type { SoundRecipe } from '../engine/types.ts';
import { surfaceRain } from './_shared/weather-textures.ts';

export default {
  id: "hail-on-pavement-loop", name: "Hail on Pavement", category: 'Weather & Ambience',
  tags: ["hail","ice","storm","pavement"], loopable: true, durationSec: 7.6,
  params: { size: { label: "Size", min: 0, max: 1, default: 0.62 } },
  render(ctx, { params }) {
    return surfaceRain(ctx, { duration: 7.6, material: 'hail', force: 0.43 + params.size * 0.32, density: 0.60, pace: 4 });
  },
} satisfies SoundRecipe;
