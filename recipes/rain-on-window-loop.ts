import type { SoundRecipe } from '../engine/types.ts';
import { surfaceRain } from './_shared/weather-textures.ts';

export default {
  isolation: 'isolated', components: ['rain'],
  id: "rain-on-window-loop", name: "Rain on Window Glass", category: 'Weather & Ambience',
  tags: ["rain","glass","window","inside"], loopable: true, durationSec: 7.2,
  params: { drops: { label: "Drops", min: 0, max: 1, default: 0.62 } },
  render(ctx, { params }) {
    return surfaceRain(ctx, { duration: 7.2, material: 'glass', force: 0.29, density: 0.36 + params.drops * 0.62, pace: 2 });
  },
} satisfies SoundRecipe;
