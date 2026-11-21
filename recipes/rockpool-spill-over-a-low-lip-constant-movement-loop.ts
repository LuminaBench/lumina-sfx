import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/field-brook-bed.ts';
import wash from './_recordings/milestone-smallwater.ts';
import detail from './_recordings/atlas-pebble.ts';

export default {
  id: "rockpool-spill-over-a-low-lip-constant-movement-loop", name: "Rockpool spill over a low lip — constant movement", category: "Water & Fire",
  tags: ["water", "field-recording", "open", "constant movement", "rockpool", "spill", "over", "a"], loopable: true, durationSec: 6.99,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.61 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4400, detailHz: 6800, spacing: 1.22, depth: .59, space: "open" }, "steady");
  },
} satisfies SoundRecipe;
