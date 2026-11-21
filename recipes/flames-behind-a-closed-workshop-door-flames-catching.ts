import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-inferno.ts';
import wash from './_recordings/atlas-fire.ts';
import detail from './_recordings/dry-branch-snap.ts';

export default {
  id: "flames-behind-a-closed-workshop-door-flames-catching", name: "Flames behind a closed workshop door — flames catching", category: "Water & Fire",
  tags: ["fire", "field-recording", "screened", "flames catching", "flames", "behind", "a", "closed"], loopable: false, durationSec: 5.59,
  mixRole: "ambience", targetRmsDbfs: -24,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.72 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 970, detailHz: 1450, spacing: 2.4, depth: .34, space: "screened" }, "surge");
  },
} satisfies SoundRecipe;
