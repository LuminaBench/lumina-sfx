import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-inferno.ts';
import wash from './_recordings/demo-sheltered-wind.ts';
import detail from './_recordings/atlas-fire.ts';

export default {
  id: "fire-breathing-up-a-stone-chimney-flames-catching", name: "Fire breathing up a stone chimney — flames catching", category: "Water & Fire",
  tags: ["fire", "field-recording", "passage", "flames catching", "breathing", "up", "a"], loopable: false, durationSec: 4.67,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.72 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 1700, detailHz: 5300, spacing: 1.21, depth: .56, space: "passage" }, "surge");
  },
} satisfies SoundRecipe;
