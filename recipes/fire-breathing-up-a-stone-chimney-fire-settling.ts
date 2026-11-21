import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-inferno.ts';
import wash from './_recordings/demo-sheltered-wind.ts';
import detail from './_recordings/atlas-fire.ts';

export default {
  id: "fire-breathing-up-a-stone-chimney-fire-settling", name: "Fire breathing up a stone chimney — fire settling", category: "Water & Fire",
  tags: ["fire", "field-recording", "passage", "fire settling", "breathing", "up", "a"], loopable: false, durationSec: 4.79,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.52 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 1700, detailHz: 5300, spacing: 1.21, depth: .56, space: "passage" }, "retreat");
  },
} satisfies SoundRecipe;
