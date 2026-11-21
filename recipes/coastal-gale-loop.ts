import type { SoundRecipe } from '../engine/types.ts';
import { windBed } from './_shared/weather-textures.ts';

export default {
  id: "coastal-gale-loop", name: "Coastal Gale", category: 'Weather & Ambience',
  tags: ["wind","gale","coastal","exposed"], loopable: true, durationSec: 9.5,
  params: { gust: { label: "Gust", min: 0, max: 1, default: 0.79 } },
  render(ctx, { params }) {
    return windBed(ctx, 9.5, 4, 0.58 + params.gust * 0.31, 0.78);
  },
} satisfies SoundRecipe;
