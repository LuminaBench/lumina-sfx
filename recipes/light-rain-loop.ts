import type { SoundRecipe } from '../engine/types.ts';
import { rainBed } from './_shared/weather.ts';

export default {
  id: 'light-rain-loop', name: "Light Rain", category: 'Weather & Ambience',
  tags: ["rain","weather","drizzle","loop"], loopable: true, durationSec: 6,
  params: { drops: { label: 'Drops', min: 0, max: 1, default: 0.62 } },
  render(ctx, { params }) {
    return rainBed(ctx, 0.32, 0.31 + params.drops * 0.55, 6);
  },
} satisfies SoundRecipe;
