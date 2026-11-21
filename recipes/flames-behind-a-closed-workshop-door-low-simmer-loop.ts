import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-inferno.ts';
import wash from './_recordings/atlas-fire.ts';
import detail from './_recordings/dry-branch-snap.ts';

export default {
  id: "flames-behind-a-closed-workshop-door-low-simmer-loop", name: "Flames behind a closed workshop door — low simmer", category: "Water & Fire",
  tags: ["fire", "field-recording", "screened", "low simmer", "flames", "behind", "a", "closed"], loopable: true, durationSec: 7.67,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.23 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 970, detailHz: 1450, spacing: 2.4, depth: .34, space: "screened" }, "scattered");
  },
} satisfies SoundRecipe;
