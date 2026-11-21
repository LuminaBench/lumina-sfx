import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-tin.ts';
import wash from './_recordings/atlas-leaves.ts';
import detail from './_recordings/atlas-drain.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { biquad, noise, renderSamples, TAU } from '../engine/dsp.ts';
import { rainBed } from './_shared/weather.ts';

const original = {
  id: 'heavy-storm-rain-loop', name: "Heavy Storm Rain", category: 'Weather & Ambience',
  tags: ["rain","storm","weather","downpour","loop"], loopable: true, durationSec: 7,
  params: { gusts: { label: 'Gusts', min: 0, max: 1, default: 0.74 } },
  render(ctx, { params }) {
    const bed = rainBed(ctx, 0.93, 0.65, 7);
    const wind = noise(ctx.random, 'brown');
    const roll = biquad('lowpass', 104, 0.67, ctx.sampleRate);
    return renderSamples(ctx, (t, i) => {
      const gust = 0.5 + 0.5 * Math.sin(TAU * t * 2 / 7 + 0.61);
      return bed[i] * (0.87 + 0.29 * gust) + roll(wind()) * gust * params.gusts;
    });
  },
} satisfies SoundRecipe;

export default {
  ...original,
  ...sceneCredits(source, wash, detail),
  render(ctx, opts) {
    const old = original.render(ctx, opts);
    const field = fieldWeather(ctx, opts.seed, opts.params.gusts, {
      base: source, wash, detail, bodyHz: 6400, detailHz: 7800, spacing: 0.59, depth: 0.68, space: "open",
    }, "steady");
    return field.map((v, i) => v * .81 + old[i] * .16);
  },
} satisfies SoundRecipe;
