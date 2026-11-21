import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/demo-film-wind.ts';
import wash from './_recordings/demo-sheltered-wind.ts';
import detail from './_recordings/field-farm-air.ts';

export default {
  id: "wind-pushing-through-a-narrow-rock-slot-intermittent-lulls-loop", name: "Wind pushing through a narrow rock slot — intermittent lulls", category: "Weather & Ambience",
  tags: ["wind", "field-recording", "basin", "intermittent lulls", "pushing", "through", "a"], loopable: true, durationSec: 7.18,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 2600, detailHz: 5200, spacing: 1.68, depth: .75, space: "basin" }, "scattered");
  },
} satisfies SoundRecipe;
