import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/field-brook-bed.ts';
import wash from './_recordings/milestone-smallwater.ts';
import detail from './_recordings/atlas-pebble.ts';

export default {
  id: "rockpool-spill-over-a-low-lip-water-receding", name: "Rockpool spill over a low lip — water receding", category: "Water & Fire",
  tags: ["water", "field-recording", "open", "water receding", "rockpool", "spill", "over", "a"], loopable: false, durationSec: 4.8,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4400, detailHz: 6800, spacing: 1.22, depth: .59, space: "open" }, "retreat");
  },
} satisfies SoundRecipe;
