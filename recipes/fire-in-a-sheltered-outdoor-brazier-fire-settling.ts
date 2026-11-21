import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-fire.ts';
import wash from './_recordings/demo-sheltered-wind.ts';
import detail from './_recordings/atlas-inferno.ts';

export default {
  id: "fire-in-a-sheltered-outdoor-brazier-fire-settling", name: "Fire in a sheltered outdoor brazier — fire settling", category: "Water & Fire",
  tags: ["fire", "field-recording", "screened", "fire settling", "in", "a", "sheltered"], loopable: false, durationSec: 5.18,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4150, detailHz: 5400, spacing: 1.72, depth: .41, space: "screened" }, "retreat");
  },
} satisfies SoundRecipe;
