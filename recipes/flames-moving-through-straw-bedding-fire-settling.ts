import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-fire.ts';
import wash from './_recordings/atlas-inferno.ts';
import detail from './_recordings/field-stalk-bed.ts';

export default {
  id: "flames-moving-through-straw-bedding-fire-settling", name: "Flames moving through straw bedding — fire settling", category: "Water & Fire",
  tags: ["fire", "field-recording", "open", "fire settling", "flames", "moving", "through", "straw"], loopable: false, durationSec: 4.47,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 5500, detailHz: 7450, spacing: .79, depth: .76, space: "open" }, "retreat");
  },
} satisfies SoundRecipe;
