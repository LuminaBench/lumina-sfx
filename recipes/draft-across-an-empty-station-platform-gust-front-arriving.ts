import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/demo-station-room.ts';
import wash from './_recordings/demo-film-wind.ts';
import detail from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "draft-across-an-empty-station-platform-gust-front-arriving", name: "Draft across an empty station platform — gust front arriving", category: "Weather & Ambience",
  tags: ["wind", "field-recording", "passage", "gust front arriving", "draft", "across", "an", "empty"], loopable: false, durationSec: 5.09,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.72 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 3200, detailHz: 5800, spacing: 1.75, depth: .52, space: "passage" }, "surge");
  },
} satisfies SoundRecipe;
