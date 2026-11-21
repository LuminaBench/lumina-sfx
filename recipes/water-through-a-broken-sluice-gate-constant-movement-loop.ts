import type { SoundRecipe } from '../engine/types.ts';
import { fieldWeather } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-drain.ts';
import wash from './_recordings/field-brook-bed.ts';
import detail from './_recordings/milestone-paddlehit.ts';

export default {
  id: "water-through-a-broken-sluice-gate-constant-movement-loop", name: "Water through a broken sluice gate — constant movement", category: "Water & Fire",
  tags: ["water", "field-recording", "passage", "constant movement", "through", "a", "broken"], loopable: true, durationSec: 6.75,
  mixRole: "ambience", targetRmsDbfs: -25,
  params: { intensity: { label: "Intensity", min: 0, max: 1, default: 0.61 } },
  ...sceneCredits(source, wash, detail),
  render(ctx, { seed, params }) {
    return fieldWeather(ctx, seed, params.intensity, { base: source, wash, detail, bodyHz: 2900, detailHz: 6800, spacing: .87, depth: .68, space: "passage" }, "steady");
  },
} satisfies SoundRecipe;
