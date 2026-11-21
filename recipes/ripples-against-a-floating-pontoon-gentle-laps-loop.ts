import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/milestone-smallwater.ts';
import wash from './_recordings/milestone-bow.ts';
import detail from './_recordings/milestone-snapwater.ts';

export default {
  id: "ripples-against-a-floating-pontoon-gentle-laps-loop", name: "Ripples against a floating pontoon — gentle laps", category: "Water & Fire",
  tags: ["water", "field-recording", "open", "gentle laps", "ripples", "against", "a", "floating"], loopable: true, durationSec: 6.66,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 5300, detailHz: 7800, spacing: .91, depth: .48, space: "open" }, "scattered");
  },
} satisfies SoundRecipe;
