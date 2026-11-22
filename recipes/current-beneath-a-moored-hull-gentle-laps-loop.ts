import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/motion-harbor-hydrophone.ts';
import wash from './_recordings/reviewed-motion-sailboat-cabin.ts';
import detail from './_recordings/atlas-bubbles.ts';

export default {
  id: "current-beneath-a-moored-hull-gentle-laps-loop", name: "Current beneath a moored hull — gentle laps", category: "Water & Fire",
  tags: ["water", "field-recording", "underwater", "gentle laps", "current", "beneath", "a", "moored"], loopable: true, durationSec: 7.56,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 490, detailHz: 960, spacing: 2.23, depth: .60, space: "underwater" }, "scattered");
  },
} satisfies SoundRecipe;
