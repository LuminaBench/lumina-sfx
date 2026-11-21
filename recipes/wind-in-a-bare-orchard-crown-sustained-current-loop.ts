import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/field-farm-air.ts';
import wash from './_recordings/demo-film-wind.ts';
import detail from './_recordings/dry-vine-brush.ts';

export default {
  id: "wind-in-a-bare-orchard-crown-sustained-current-loop", name: "Wind in a bare orchard crown — sustained current", category: "Weather & Ambience",
  tags: ["wind", "field-recording", "open", "sustained current", "in", "a", "bare"], loopable: true, durationSec: 7.39,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.61 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 5200, detailHz: 5900, spacing: 1.81, depth: .52, space: "open" }, "steady");
  },
} satisfies SoundRecipe;
