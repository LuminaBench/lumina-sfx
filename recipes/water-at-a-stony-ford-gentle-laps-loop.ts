import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/field-brook-bed.ts';
import wash from './_recordings/atlas-pebble.ts';
import detail from './_recordings/milestone-smallwater.ts';

export default {
  id: "water-at-a-stony-ford-gentle-laps-loop", name: "Water at a stony ford — gentle laps", category: "Water & Fire",
  tags: ["water", "field-recording", "open", "gentle laps", "at", "a", "stony"], loopable: true, durationSec: 6.58,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4300, detailHz: 7500, spacing: .80, depth: .57, space: "open" }, "scattered");
  },
} satisfies SoundRecipe;
