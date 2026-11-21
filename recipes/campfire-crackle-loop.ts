import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-fire.ts';
import wash from './_recordings/atlas-inferno.ts';
import detail from './_recordings/atlas-fire.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { biquad, layer, noise, punch, renderSamples, TAU } from '../engine/dsp.ts';

const original = {
  id: 'campfire-crackle-loop', name: "Campfire Crackle", category: 'Weather & Ambience',
  tags: ["campfire","fire","embers","crackle","loop"], loopable: true, durationSec: 7,
  params: { sparks: { label: 'Sparks', min: 0, max: 1, default: 0.61 } },
  render(ctx, { params }) {
    const bedNoise = noise(ctx.random, 'brown');
    const air = noise(ctx.random, 'pink');
    const body = biquad('lowpass', 460, 0.7, ctx.sampleRate);
    const fizz = biquad('bandpass', 1450, 0.65, ctx.sampleRate);
    const sound = renderSamples(ctx, (t) => (0.49 + 0.17 * Math.sin(TAU * t * 4 / 7)) * body(bedNoise()) + 0.27 * fizz(air()));
    const events = Math.round(79 + params.sparks * 88);
    for (let i = 0; i < events; i++) {
      const at = ctx.random() * (ctx.frames / ctx.sampleRate);
      const size = 0.07 + ctx.random() ** 3 * 0.85;
      const decay = 0.003 + ctx.random() * 0.021;
      layer(ctx, sound, at, 0.095, (shot) => punch(shot, [
        { color: 'white', kind: 'highpass', hz: 1100 + ctx.random() * 3800, gain: 1.1, attack: 0.0002, decay },
        { color: 'pink', kind: 'bandpass', hz: 420 + ctx.random() * 970, gain: 0.87, attack: 0.00035, decay: decay * 1.14 },
      ]), size);
    }
    return sound;
  },
} satisfies SoundRecipe;

export default {
  ...original,
  ...sceneCredits(source, wash, detail),
  render(ctx, opts) {
    const old = original.render(ctx, opts);
    const field = fieldWeather(ctx, opts.seed, opts.params.sparks, {
      base: source, wash, detail, bodyHz: 5650, detailHz: 7600, spacing: 1.29, depth: 0.44, space: "open",
    }, "scattered");
    return field.map((v, i) => v * .81 + old[i] * .16);
  },
} satisfies SoundRecipe;
