import type { SoundRecipe } from '../engine/types.ts';
import { windBed } from './_shared/weather-textures.ts';

export default {
  id: "rapid-wind-gusts-loop", name: "Rapid Wind Gusts", category: 'Weather & Ambience',
  tags: ["wind","gust","fast","outdoors"], loopable: true, durationSec: 7,
  params: { swell: { label: "Swell", min: 0, max: 1, default: 0.75 } },
  render(ctx, { params }) {
    return windBed(ctx, 7, 6, 0.47 + params.swell * 0.33, 0.26);
  },
} satisfies SoundRecipe;
