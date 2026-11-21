import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-leaves.ts';
import wash from './_recordings/milestone-smallwater.ts';
import detail from './_recordings/atlas-hail.ts';

export default {
  id: "sleet-in-a-shallow-slush-puddle-first-scattered-strikes-loop", name: "Sleet in a shallow slush puddle — first scattered strikes", category: "Weather & Ambience",
  tags: ["hail", "field-recording", "open", "first scattered strikes", "sleet", "in", "a", "shallow"], loopable: true, durationSec: 6.3,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4750, detailHz: 7300, spacing: .38, depth: .48, space: "open" }, "scattered");
  },
} satisfies SoundRecipe;
