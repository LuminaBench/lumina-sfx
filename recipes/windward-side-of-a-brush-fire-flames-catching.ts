import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/demo-film-wind.ts';
import wash from './_recordings/atlas-inferno.ts';
import detail from './_recordings/atlas-fire.ts';

export default {
  id: "windward-side-of-a-brush-fire-flames-catching", name: "Windward side of a brush fire — flames catching", category: "Water & Fire",
  tags: ["fire", "field-recording", "open", "flames catching", "windward", "side", "of", "a"], loopable: false, durationSec: 4.54,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.72 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4600, detailHz: 8100, spacing: 1.04, depth: .75, space: "open" }, "surge");
  },
} satisfies SoundRecipe;
