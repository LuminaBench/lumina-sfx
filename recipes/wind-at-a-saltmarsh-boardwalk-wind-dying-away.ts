import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/field-farm-marsh.ts';
import wash from './_recordings/demo-film-wind.ts';
import detail from './_recordings/field-corn-rustle.ts';

export default {
  id: "wind-at-a-saltmarsh-boardwalk-wind-dying-away", name: "Wind at a saltmarsh boardwalk — wind dying away", category: "Weather & Ambience",
  tags: ["wind", "field-recording", "open", "wind dying away", "at", "a", "saltmarsh"], loopable: false, durationSec: 4.74,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4150, detailHz: 6100, spacing: 1.14, depth: .56, space: "open" }, "retreat");
  },
} satisfies SoundRecipe;
