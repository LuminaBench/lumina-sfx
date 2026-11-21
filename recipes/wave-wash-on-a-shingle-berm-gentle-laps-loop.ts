import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-pebble.ts';
import wash from './_recordings/milestone-ocean.ts';
import detail from './_recordings/natural-gravel-drag.ts';

export default {
  id: "wave-wash-on-a-shingle-berm-gentle-laps-loop", name: "Wave wash on a shingle berm — gentle laps", category: "Water & Fire",
  tags: ["water", "field-recording", "open", "gentle laps", "wave", "wash", "on", "a"], loopable: true, durationSec: 7.17,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4700, detailHz: 7300, spacing: 1.66, depth: .68, space: "open" }, "scattered");
  },
} satisfies SoundRecipe;
