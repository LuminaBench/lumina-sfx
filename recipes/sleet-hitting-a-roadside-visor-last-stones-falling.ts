import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-glass.ts';
import wash from './_recordings/field-wet-road.ts';
import detail from './_recordings/atlas-hail.ts';

export default {
  id: "sleet-hitting-a-roadside-visor-last-stones-falling", name: "Sleet hitting a roadside visor — last stones falling", category: "Weather & Ambience",
  tags: ["hail", "field-recording", "screened", "last stones falling", "sleet", "hitting", "a", "roadside"], loopable: false, durationSec: 4.45,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 3800, detailHz: 6200, spacing: .77, depth: .36, space: "screened" }, "retreat");
  },
} satisfies SoundRecipe;
