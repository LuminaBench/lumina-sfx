import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-glass.ts';
import wash from './_recordings/atlas-tin.ts';
import detail from './_recordings/water-drops-from-spout.ts';

export default {
  id: "rain-on-a-greenhouse-glazing-bar-individual-drops-loop", name: "Rain on a greenhouse glazing bar — individual drops", category: "Weather & Ambience",
  tags: ["rain", "field-recording", "interior", "individual drops", "on", "a", "greenhouse"], loopable: true, durationSec: 6.39,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4700, detailHz: 7800, spacing: .52, depth: .66, space: "interior" }, "scattered");
  },
} satisfies SoundRecipe;
