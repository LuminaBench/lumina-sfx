import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/demo-film-wind.ts';
import wash from './_recordings/atlas-inferno.ts';
import detail from './_recordings/atlas-fire.ts';

export default {
  id: "windward-side-of-a-brush-fire-sustained-burn-loop", name: "Windward side of a brush fire — sustained burn", category: "Water & Fire",
  tags: ["fire", "field-recording", "open", "sustained burn", "windward", "side", "of", "a"], loopable: true, durationSec: 6.87,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.61 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4600, detailHz: 8100, spacing: 1.04, depth: .75, space: "open" }, "steady");
  },
} satisfies SoundRecipe;
