import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/isolated-rain-roof.ts';

export default {
  id: "windblown-rain-on-a-loose-garage-door-continuous-patter-loop", name: "Windblown rain on a loose garage door — continuous patter", category: "Weather & Ambience",
  tags: ["rain", "field-recording", "interior", "continuous patter", "windblown", "on", "a"], loopable: true, sustainMode: 'evolving', durationSec: 6.98,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.61 } },
  ...sceneCredits(source), isolation: 'isolated', components: ['rain'],
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash: source, detail: source, singlePerformance: true, bodyHz: 4800, detailHz: 7100, spacing: 1.2, depth: .51, space: "interior" }, "steady");
  },
} satisfies SoundRecipe;
