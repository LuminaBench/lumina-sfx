import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-drain.ts';
import wash from './_recordings/field-brook-bed.ts';
import detail from './_recordings/water-drops-from-spout.ts';

export default {
  id: "eddy-in-a-rocky-culvert-water-surging-in", name: "Eddy in a rocky culvert — water surging in", category: "Water & Fire",
  tags: ["water", "field-recording", "passage", "water surging in", "eddy", "in", "a", "rocky"], loopable: false, durationSec: 4.29,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.72 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 3400, detailHz: 5950, spacing: .72, depth: .61, space: "passage" }, "surge");
  },
} satisfies SoundRecipe;
