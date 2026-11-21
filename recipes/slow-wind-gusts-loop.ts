import type { SoundRecipe } from '../engine/types.ts';
import { windBed } from './_shared/weather-textures.ts';

export default {
  id: "slow-wind-gusts-loop", name: "Slow Wind Gusts", category: 'Weather & Ambience',
  tags: ["wind","breeze","gust","slow"], loopable: true, durationSec: 10.4,
  params: { swell: { label: "Swell", min: 0, max: 1, default: 0.67 } },
  render(ctx, { params }) {
    return windBed(ctx, 10.4, 2, 0.21 + params.swell * 0.24, 0.15);
  },
} satisfies SoundRecipe;
