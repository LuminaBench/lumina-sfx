import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/water-drops-from-spout.ts';
import wash from './_recordings/atlas-tin.ts';
import detail from './_recordings/milestone-snapwater.ts';

export default {
  id: "raindrops-in-a-galvanized-feed-trough-continuous-patter-loop", name: "Raindrops in a galvanized feed trough — continuous patter", category: "Weather & Ambience",
  tags: ["rain", "field-recording", "open", "continuous patter", "raindrops", "in", "a", "galvanized"], loopable: true, durationSec: 6.48,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.61 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 5200, detailHz: 7800, spacing: .47, depth: .56, space: "open" }, "steady");
  },
} satisfies SoundRecipe;
