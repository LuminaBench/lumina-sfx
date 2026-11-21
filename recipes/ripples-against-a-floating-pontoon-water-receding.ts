import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/milestone-smallwater.ts';
import wash from './_recordings/milestone-bow.ts';
import detail from './_recordings/milestone-snapwater.ts';

export default {
  id: "ripples-against-a-floating-pontoon-water-receding", name: "Ripples against a floating pontoon — water receding", category: "Water & Fire",
  tags: ["water", "field-recording", "open", "water receding", "ripples", "against", "a", "floating"], loopable: false, durationSec: 4.56,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 5300, detailHz: 7800, spacing: .91, depth: .48, space: "open" }, "retreat");
  },
} satisfies SoundRecipe;
