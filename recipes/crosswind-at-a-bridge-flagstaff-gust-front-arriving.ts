import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/demo-film-wind.ts';
import wash from './_recordings/demo-flag-rush.ts';
import detail from './_recordings/demo-tent-tension.ts';

export default {
  id: "crosswind-at-a-bridge-flagstaff-gust-front-arriving", name: "Crosswind at a bridge flagstaff — gust front arriving", category: "Weather & Ambience",
  tags: ["wind", "field-recording", "open", "gust front arriving", "crosswind", "at", "a", "bridge"], loopable: false, durationSec: 4.4,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.72 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4100, detailHz: 6650, spacing: .86, depth: .64, space: "open" }, "surge");
  },
} satisfies SoundRecipe;
