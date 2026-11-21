import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-glass.ts';
import wash from './_recordings/demo-tent-tension.ts';
import detail from './_recordings/atlas-leaves.ts';

export default {
  id: "rain-along-a-canvas-market-awning-continuous-patter-loop", name: "Rain along a canvas market awning — continuous patter", category: "Weather & Ambience",
  tags: ["rain", "field-recording", "screened", "continuous patter", "along", "a", "canvas"], loopable: true, durationSec: 7.06,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.61 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4900, detailHz: 6400, spacing: 1.33, depth: .46, space: "screened" }, "steady");
  },
} satisfies SoundRecipe;
