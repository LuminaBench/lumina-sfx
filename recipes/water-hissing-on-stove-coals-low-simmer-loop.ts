import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-fire.ts';
import wash from './_recordings/atlas-steam.ts';
import detail from './_recordings/water-drops-from-spout.ts';

export default {
  id: "water-hissing-on-stove-coals-low-simmer-loop", name: "Water hissing on stove coals — low simmer", category: "Water & Fire",
  tags: ["fire", "field-recording", "interior", "low simmer", "water", "hissing", "on", "stove"], loopable: true, durationSec: 6.68,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 5150, detailHz: 7800, spacing: .94, depth: .68, space: "interior" }, "scattered");
  },
} satisfies SoundRecipe;
