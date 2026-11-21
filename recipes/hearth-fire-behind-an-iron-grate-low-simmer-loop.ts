import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-fire.ts';
import wash from './_recordings/atlas-inferno.ts';
import detail from './_recordings/dry-branch-snap.ts';

export default {
  id: "hearth-fire-behind-an-iron-grate-low-simmer-loop", name: "Hearth fire behind an iron grate — low simmer", category: "Water & Fire",
  tags: ["fire", "field-recording", "interior", "low simmer", "hearth", "behind", "an"], loopable: true, durationSec: 7.27,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 4600, detailHz: 6850, spacing: 1.81, depth: .64, space: "interior" }, "scattered");
  },
} satisfies SoundRecipe;
