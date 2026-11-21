import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-fire.ts';
import wash from './_recordings/atlas-steam.ts';
import detail from './_recordings/water-drops-from-spout.ts';

export default {
  id: "water-hissing-on-stove-coals-flames-catching", name: "Water hissing on stove coals — flames catching", category: "Water & Fire",
  tags: ["fire", "field-recording", "interior", "flames catching", "water", "hissing", "on", "stove"], loopable: false, durationSec: 4.46,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.72 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 5150, detailHz: 7800, spacing: .94, depth: .68, space: "interior" }, "surge");
  },
} satisfies SoundRecipe;
