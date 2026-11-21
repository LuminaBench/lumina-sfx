import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-leaves.ts';
import wash from './_recordings/atlas-glass.ts';
import detail from './_recordings/water-drops-from-spout.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { rainBed } from './_shared/weather.ts';

const original = {
  id: 'light-rain-loop', name: "Light Rain", category: 'Weather & Ambience',
  tags: ["rain","weather","drizzle","loop"], loopable: true, durationSec: 6,
  params: { drops: { label: 'Drops', min: 0, max: 1, default: 0.62 } },
  render(ctx, { params }) {
    return rainBed(ctx, 0.32, 0.31 + params.drops * 0.55, 6);
  },
} satisfies SoundRecipe;

export default {
  ...original,
  ...sceneCredits(source, wash, detail),
  render(ctx, opts) {
    const old = original.render(ctx, opts);
    const field = fieldWeather(ctx, opts.seed, opts.params.drops, {
      base: source, wash, detail, bodyHz: 5450, detailHz: 7450, spacing: 0.93, depth: 0.44, space: "open",
    }, "scattered");
    return field.map((v, i) => v * .81 + old[i] * .16);
  },
} satisfies SoundRecipe;
