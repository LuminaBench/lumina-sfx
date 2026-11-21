import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-tin.ts';
import wash from './_recordings/atlas-drain.ts';
import detail from './_recordings/atlas-glass.ts';

export default {
  id: "drips-over-an-apartment-fire-escape-downpour-recedes", name: "Drips over an apartment fire escape — downpour recedes", category: "Weather & Ambience",
  tags: ["rain", "field-recording", "passage", "downpour recedes", "drips", "over", "an", "apartment"], loopable: false, durationSec: 4.16,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 6650, detailHz: 5700, spacing: .39, depth: .41, space: "passage" }, "retreat");
  },
} satisfies SoundRecipe;
