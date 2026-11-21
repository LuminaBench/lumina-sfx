import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/motion-harbor-hydrophone.ts';
import wash from './_recordings/atlas-bubbles.ts';
import detail from './_recordings/milestone-snapwater.ts';

export default {
  id: "bubbles-rising-beside-a-submerged-wall-gentle-laps-loop", name: "Bubbles rising beside a submerged wall — gentle laps", category: "Water & Fire",
  tags: ["water", "field-recording", "underwater", "gentle laps", "bubbles", "rising", "beside", "a"], loopable: true, durationSec: 6.55,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 690, detailHz: 1250, spacing: .75, depth: .81, space: "underwater" }, "scattered");
  },
} satisfies SoundRecipe;
