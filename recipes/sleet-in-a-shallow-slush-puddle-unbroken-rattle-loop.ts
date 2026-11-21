import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-leaves.ts';
import wash from './_recordings/milestone-smallwater.ts';
import detail from './_recordings/atlas-hail.ts';

export default {
  id: "sleet-in-a-shallow-slush-puddle-unbroken-rattle-loop", name: "Sleet in a shallow slush puddle — unbroken rattle", category: "Weather & Ambience",
  tags: ["hail", "field-recording", "open", "unbroken rattle", "sleet", "in", "a", "shallow"], loopable: true, durationSec: 6.42,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.61 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4750, detailHz: 7300, spacing: .38, depth: .48, space: "open" }, "steady");
  },
} satisfies SoundRecipe;
