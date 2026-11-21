import type { SoundRecipe } from '../engine/types.ts';
import { surfaceRain } from './_shared/weather-textures.ts';

export default {
  id: "rain-on-puddles-loop", name: "Rain on Puddles", category: 'Weather & Ambience',
  tags: ["rain","puddles","water","splashes"], loopable: true, durationSec: 7,
  params: { splash: { label: "Splash", min: 0, max: 1, default: 0.66 } },
  render(ctx, { params }) {
    return surfaceRain(ctx, { duration: 7, material: 'puddles', force: 0.55, density: 0.32 + params.splash * 0.67, pace: 3 });
  },
} satisfies SoundRecipe;
