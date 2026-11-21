import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-fire.ts';
import wash from './_recordings/atlas-inferno.ts';
import detail from './_recordings/dry-branch-snap.ts';

export default {
  id: "hearth-fire-behind-an-iron-grate-flames-catching", name: "Hearth fire behind an iron grate — flames catching", category: "Water & Fire",
  tags: ["fire", "field-recording", "interior", "flames catching", "hearth", "behind", "an"], loopable: false, durationSec: 5.13,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.72 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4600, detailHz: 6850, spacing: 1.81, depth: .64, space: "interior" }, "surge");
  },
} satisfies SoundRecipe;
