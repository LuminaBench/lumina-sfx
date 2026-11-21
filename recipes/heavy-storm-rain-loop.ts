import type { SoundRecipe } from '../engine/types.ts';
import { biquad, noise, renderSamples, TAU } from '../engine/dsp.ts';
import { rainBed } from './_shared/weather.ts';

export default {
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
